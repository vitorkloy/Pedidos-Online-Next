import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../config/db";
import * as authService from "../../services/authService";
import { User } from "../../models/User";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    console.log("🔍 [UPDATE USER] Dados recebidos:", body);
    
    // Validar campos obrigatórios
    if (!body.name || !body.email) {
      console.error("❌ [UPDATE USER] Campos obrigatórios faltando");
      return NextResponse.json(
        { error: "Nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    // Buscar usuário atual do authService
    const currentUser = authService.getCurrentUser();
    console.log("🔍 [UPDATE USER] currentUser:", currentUser);
    
    if (!currentUser || !currentUser._id) {
      console.error("❌ [UPDATE USER] Usuário não autenticado");
      return NextResponse.json(
        { error: "Usuário não autenticado. Faça login novamente." },
        { status: 401 }
      );
    }

    // Verificar se email já está em uso por outro usuário
    if (body.email !== currentUser.email) {
      const existingUser = await User.findOne({ email: body.email });
      if (existingUser && existingUser._id.toString() !== currentUser._id.toString()) {
        return NextResponse.json(
          { error: "Este email já está cadastrado" },
          { status: 400 }
        );
      }
    }

    // Preparar dados para atualização
    const updateData: any = {
      name: body.name.trim(),
      email: body.email.trim(),
    };
    
    // Só adiciona senha se foi fornecida
    if (body.password && body.password.trim() !== '') {
      updateData.password = body.password;
    }

    console.log("🔍 [UPDATE USER] Atualizando com ID:", currentUser._id);

    // Atualizar no banco de dados
    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      console.error("❌ [UPDATE USER] Usuário não encontrado no banco");
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Atualizar currentUser no authService
    const safeUser = updatedUser.toObject();
    delete (safeUser as any).password;
    authService.setCurrentUser(safeUser);

    console.log("✅ [UPDATE USER] Usuário atualizado com sucesso");
    return NextResponse.json(safeUser);
  } catch (err: any) {
    console.error("❌ [UPDATE USER] Erro:", err);
    return NextResponse.json(
      { error: err.message || "Erro ao atualizar usuário" },
      { status: 400 }
    );
  }
}
