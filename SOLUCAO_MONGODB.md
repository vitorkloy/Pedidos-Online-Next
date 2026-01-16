# 🔧 Solução: Erro de Conexão MongoDB

## Problema Atual

Você está recebendo o erro:
```
connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017
```

Isso significa que o MongoDB não está acessível.

## ✅ Soluções

### Opção 1: Usar MongoDB Atlas (Recomendado - Já Configurado)

O projeto já está configurado para usar MongoDB Atlas. Apenas certifique-se de que:

1. **A URI do MongoDB está correta no código** (já está configurada)
2. **O IP do seu computador está na whitelist do Atlas**

**Como adicionar seu IP no MongoDB Atlas:**

1. Acesse: https://cloud.mongodb.com/
2. Faça login na sua conta
3. Vá em **Network Access**
4. Clique em **Add IP Address**
5. Adicione `0.0.0.0/0` (permite qualquer IP) OU seu IP específico
6. Aguarde alguns minutos para a mudança surtir efeito

### Opção 2: Usar MongoDB Local

Se preferir usar MongoDB local:

1. **Instalar MongoDB:**
   - Download: https://www.mongodb.com/try/download/community
   - Siga o instalador (Windows/Mac/Linux)

2. **Iniciar MongoDB:**
   
   **Windows:**
   ```powershell
   net start MongoDB
   ```
   
   **Linux/Mac:**
   ```bash
   sudo systemctl start mongod
   # ou
   mongod
   ```

3. **Atualizar configuração:**
   
   Crie um arquivo `.env.local` na raiz do projeto `agoravai/`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/pedidos-online
   ```

### Opção 3: Criar Nova Conta MongoDB Atlas (Gratuita)

1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie uma conta gratuita (M0 - Free Tier)
3. Crie um cluster (escolha a região mais próxima)
4. Configure um usuário de banco de dados:
   - Database Access → Add New Database User
   - Username: `pedidos-admin`
   - Password: (anote a senha!)
   - Role: `Atlas admin`
5. Configure Network Access:
   - Network Access → Add IP Address
   - Escolha "Allow Access from Anywhere" (`0.0.0.0/0`)
6. Obtenha a Connection String:
   - Clusters → Connect → Connect your application
   - Copie a string de conexão
   - Substitua `<password>` pela senha do usuário
   - Adicione o nome do banco: `/pedidos-online?retryWrites=true&w=majority`

7. **Atualize o arquivo `.env.local`:**
   
   Na raiz do projeto `agoravai/`, crie/edite `.env.local`:
   ```env
   MONGODB_URI=mongodb+srv://pedidos-admin:SUA_SENHA@cluster0.xxxxx.mongodb.net/pedidos-online?retryWrites=true&w=majority
   ```

## 🚀 Após Configurar

1. **Reinicie o servidor Next.js:**
   ```bash
   # Pare o servidor (Ctrl + C)
   npm run dev
   ```

2. **Verifique os logs:**
   - Deve aparecer: `🚀 MongoDB conectado com sucesso!`
   - Se aparecer erro, verifique a URI e as credenciais

## 📋 Verificação Rápida

Execute no terminal (dentro da pasta `agoravai`):

```bash
# Verificar se existe .env.local
Get-Content .env.local

# Ou no Linux/Mac:
cat .env.local
```

## ⚠️ Erro 401 no Login

O erro `api/auth/login:1 Failed to load resource: the server responded with a status of 401` é normal se:
- Você ainda não criou uma conta
- As credenciais estão incorretas
- O MongoDB não está conectado (erro anterior)

**Após resolver o MongoDB, tente:**
1. Criar uma nova conta em `/signup`
2. Fazer login em `/login`

## 🆘 Ainda com Problemas?

1. Verifique os logs do terminal onde `npm run dev` está rodando
2. Verifique se a URI do MongoDB está correta (sem espaços, com senha correta)
3. Teste a conexão do MongoDB Atlas no navegador (página do cluster)
4. Certifique-se de que o IP está na whitelist do Atlas
