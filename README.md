# Pedidos Online - Next.js

Sistema de pedidos online para restaurante, migrado de Vite + React para Next.js com backend integrado.

## Estrutura do Projeto

O projeto foi migrado de uma estrutura separada (Frontend Vite + Backend Express) para uma aplicação Next.js unificada:

- **Frontend + Backend**: Tudo unificado no Next.js
- **API Routes**: Backend migrado para `app/api/`
- **Páginas**: Frontend migrado para `app/`
- **Componentes**: Mantidos em `components/`

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
MONGODB_URI=mongodb://localhost:27017/pedidos-online
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

### Instalação

```bash
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### Build para Produção

```bash
npm run build
npm start
```

## Estrutura de Diretórios

```
.
├── app/                    # App Router do Next.js
│   ├── api/               # API Routes (Backend)
│   │   ├── auth/          # Rotas de autenticação
│   │   ├── products/      # Rotas de produtos
│   │   ├── config/        # Configuração do MongoDB
│   │   ├── models/        # Modelos do Mongoose
│   │   └── services/      # Serviços do backend
│   ├── admin/             # Página administrativa
│   ├── login/             # Página de login
│   ├── signup/            # Página de cadastro
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── admin/             # Componentes administrativos
│   └── ui/                # Componentes UI (shadcn/ui)
├── hooks/                 # React Hooks
├── lib/                   # Utilitários
├── services/              # Serviços do frontend (API client)
└── types/                 # Tipos TypeScript
```

## Funcionalidades

- ✅ Catálogo de produtos
- ✅ Carrinho de compras
- ✅ Integração com WhatsApp para pedidos
- ✅ Painel administrativo
- ✅ Autenticação de usuários
- ✅ CRUD de produtos

## Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Mongoose** - ODM para MongoDB
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **React Query** - Gerenciamento de estado do servidor
- **Lucide React** - Ícones

## Telas do Sistema
### Inicial
![Interface do sistema](https://github.com/vitorkloy/Pedidos-Online-Next/blob/main/public/images/telas/inicial.png)
### Carrinho
![Interface do sistema](https://github.com/vitorkloy/Pedidos-Online-Next/blob/main/public/images/telas/carrinho%20c%20compras.png)
### Entrar
![Interface do sistema](https://github.com/vitorkloy/Pedidos-Online-Next/blob/main/public/images/telas/entrar.png)
### Cadastro
![Interface do sistema](https://github.com/vitorkloy/Pedidos-Online-Next/blob/main/public/images/telas/cadastrar.png)
### Painel
![Interface do sistema](https://github.com/vitorkloy/Pedidos-Online-Next/blob/main/public/images/telas/painel.png)
### Novo Produto
![Interface do sistema](https://github.com/vitorkloy/Pedidos-Online-Next/blob/main/public/images/telas/novo%20produto.png)
### Editar Produto
![Interface do sistema](https://github.com/vitorkloy/Pedidos-Online-Next/blob/main/public/images/telas/editar%20produto.png)
### Editar Conta
![Interface do sistema](https://github.com/vitorkloy/Pedidos-Online-Next/blob/main/public/images/telas/editar%20conta.png)

## Notas Importantes

### Autenticação

A autenticação atual é simples e usa estado em memória. Para produção, recomenda-se implementar:

- JWT tokens
- Sessões seguras (NextAuth.js)
- Hash de senhas (bcrypt)

### MongoDB

Certifique-se de que o MongoDB está rodando antes de iniciar a aplicação.

### Componentes UI

Alguns componentes UI do shadcn/ui podem precisar ser copiados manualmente do projeto original se houver erros de importação. Os componentes essenciais já foram migrados.
