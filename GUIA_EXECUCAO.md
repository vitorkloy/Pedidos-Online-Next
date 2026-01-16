# 🚀 Guia de Execução - Pedidos Online

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

1. **Node.js** (versão 18 ou superior)
   - Verificar: `node --version`
   - Download: https://nodejs.org/

2. **MongoDB** (opcional se usar MongoDB Atlas)
   - MongoDB local: https://www.mongodb.com/try/download/community
   - Ou use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

3. **npm** ou **yarn** (vem com Node.js)
   - Verificar: `npm --version`

## 📋 Passo a Passo

### 1. Instalar Dependências

Primeiro, instale todas as dependências do projeto:

```bash
npm install
```

Isso pode levar alguns minutos na primeira vez.

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

**Para MongoDB Local:**
```env
MONGODB_URI=mongodb://localhost:27017/pedidos-online
```

**Para MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/pedidos-online?retryWrites=true&w=majority
```

**Exemplo de arquivo completo:**
```env
MONGODB_URI=mongodb://localhost:27017/pedidos-online
NEXTAUTH_SECRET=seu-secret-key-aqui
NEXTAUTH_URL=http://localhost:3000
```

> 💡 **Nota:** Se não criar o arquivo `.env.local`, o projeto usará o valor padrão `mongodb://localhost:27017/pedidos-online`

### 3. Iniciar MongoDB (se usar local)

Se estiver usando MongoDB local, certifique-se de que o serviço está rodando:

**Windows:**
```bash
# O MongoDB geralmente inicia automaticamente como serviço
# Se não estiver rodando, inicie manualmente:
net start MongoDB
```

**Linux/Mac:**
```bash
# Iniciar MongoDB
sudo systemctl start mongod
# ou
mongod
```

### 4. Executar o Projeto

#### Modo Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em: **http://localhost:3000**

#### Modo Produção

1. Fazer build:
```bash
npm run build
```

2. Iniciar servidor:
```bash
npm start
```

### 5. Acessar a Aplicação

Após executar `npm run dev`, abra seu navegador e acesse:

- **Homepage:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Cadastro:** http://localhost:3000/signup
- **Admin:** http://localhost:3000/admin (requer login)

## 🔧 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa linter (verifica código) |

## ⚠️ Solução de Problemas

### Erro: "MongoServerError: connect ECONNREFUSED"

**Problema:** MongoDB não está rodando ou URI incorreta.

**Solução:**
1. Verificar se MongoDB está rodando
2. Verificar a URI no `.env.local`
3. Testar conexão: `mongosh mongodb://localhost:27017`

### Erro: "Module not found" ou erros de importação

**Problema:** Dependências não instaladas ou node_modules corrompido.

**Solução:**
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro: Porta 3000 já em uso

**Problema:** Outra aplicação está usando a porta 3000.

**Solução:**
1. Parar a outra aplicação
2. Ou mudar a porta no Next.js (não recomendado sem ajustes)

### Erro ao acessar /admin sem estar logado

**Comportamento esperado:** A página redireciona para `/login` automaticamente.

## 📝 Primeiro Uso

1. **Criar uma conta:**
   - Acesse http://localhost:3000/signup
   - Preencha nome, email e senha
   - Clique em "Criar Conta"

2. **Fazer login:**
   - Acesse http://localhost:3000/login
   - Use as credenciais criadas

3. **Gerenciar produtos:**
   - Após login, acesse http://localhost:3000/admin
   - Clique em "Novo Produto" para adicionar produtos

4. **Fazer pedidos:**
   - Na homepage, adicione produtos ao carrinho
   - Clique no carrinho e finalize pelo WhatsApp

## 🎯 Estrutura de Arquivos Importantes

```
pedidos-online/
├── .env.local              # Variáveis de ambiente (criar manualmente)
├── package.json            # Dependências e scripts
├── app/                    # Páginas e API routes
│   ├── api/               # Backend (API routes)
│   └── page.tsx           # Homepage
├── components/            # Componentes React
├── hooks/                 # React Hooks
└── services/             # Serviços de API
```

## 💡 Dicas

- Use `Ctrl + C` no terminal para parar o servidor de desenvolvimento
- Os logs aparecem no terminal onde você executou `npm run dev`
- Alterações no código recarregam automaticamente (hot reload)
- Erros aparecem no navegador e no terminal

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no terminal
2. Verifique se MongoDB está rodando
3. Verifique se as variáveis de ambiente estão corretas
4. Verifique se todas as dependências foram instaladas
