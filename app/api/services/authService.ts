import { User } from "../models/User";

// Em um ambiente serverless, usamos uma variável de módulo para armazenar o usuário atual
// Em produção, você deve usar sessões ou tokens JWT
let currentUser: any = null;

export async function signup({ email, password, name }: { email: string; password: string; name: string }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Este email já está cadastrado");

  const newUser = new User({ email, password, name });
  await newUser.save();

  const safeUser = newUser.toObject();
  delete (safeUser as any).password;
  
  currentUser = safeUser;
  return currentUser;
}

export async function login({ email, password }: { email: string; password: string }) {
  const user = await User.findOne({ email, password });
  if (!user) throw new Error("Email ou senha incorretos");

  const safeUser = user.toObject();
  delete (safeUser as any).password;

  currentUser = safeUser;
  return currentUser;
}

export function logout() { 
  currentUser = null; 
}

export function getCurrentUser() { 
  return currentUser; 
}

export function setCurrentUser(user: any) {
  currentUser = user;
}

export async function updateUser(updates: { name?: string; email?: string; password?: string }) {
  console.log("🔍 [authService.updateUser] currentUser:", currentUser);
  console.log("🔍 [authService.updateUser] updates:", updates);
  
  if (!currentUser || !currentUser._id) {
    console.error("❌ [authService.updateUser] currentUser não encontrado");
    throw new Error("Usuário não encontrado. Faça login novamente.");
  }

  // Validar campos obrigatórios
  if (!updates.name || !updates.email) {
    throw new Error("Nome e email são obrigatórios");
  }

  // Verificar se email já está em uso por outro usuário
  if (updates.email !== currentUser.email) {
    const existingUser = await User.findOne({ email: updates.email });
    if (existingUser && existingUser._id.toString() !== currentUser._id.toString()) {
      console.error("❌ [authService.updateUser] Email já está em uso");
      throw new Error("Este email já está cadastrado");
    }
  }

  // Preparar dados para atualização
  const updateData: any = {
    name: updates.name,
    email: updates.email,
  };
  
  // Só adiciona senha se foi fornecida
  if (updates.password && updates.password.trim() !== '') {
    updateData.password = updates.password;
  }

  console.log("🔍 [authService.updateUser] updateData:", { ...updateData, password: updateData.password ? '***' : undefined });

  // Atualizar no banco de dados
  const updatedUser = await User.findByIdAndUpdate(
    currentUser._id,
    updateData,
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    console.error("❌ [authService.updateUser] Falha ao atualizar no banco");
    throw new Error("Erro ao atualizar usuário no banco de dados");
  }

  console.log("✅ [authService.updateUser] Usuário atualizado no banco");

  // Atualizar currentUser sem a senha
  const safeUser = updatedUser.toObject();
  delete (safeUser as any).password;
  
  currentUser = safeUser;
  console.log("✅ [authService.updateUser] currentUser atualizado");
  
  return currentUser;
}