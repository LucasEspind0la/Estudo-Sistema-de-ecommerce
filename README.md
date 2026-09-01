cd ~/Área\ de\ Trabalho/Vendas

cat << 'EOF' > README.md
# Sistema de E-commerce Full Stack - API RESTful & Angular

<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.x-brightgreen?style=for-the-badge&logo=spring)
![Angular](https://img.shields.io/badge/Angular-17+-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Security-black?style=for-the-badge&logo=jsonwebtokens)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge&logo=swagger)
![Testes](https://img.shields.io/badge/Testes-JUnit%20%26%20Mockito-yellow?style=for-the-badge&logo=junit5)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

Sistema completo de e-commerce Full Stack, desenvolvido com **Spring Boot** (Backend) e **Angular** (Frontend). O projeto implementa um fluxo real de vendas, desde o gerenciamento de produtos pelo administrador até a finalização de compra pelo cliente, com autenticação segura via JWT, controle de acesso baseado em papéis (RBAC) e testes automatizados.

-------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📖 Visão Geral do Projeto

<table>
<tr>
<td width="50%">

### 🎯 Objetivo
Servir como material de estudo avançado e portfólio profissional, demonstrando domínio em arquitetura em camadas, segurança, boas práticas de UI/UX e integração completa entre Frontend e Backend.

### ✨ Destaques Técnicos (Backend)
- Arquitetura em camadas (Controller → Service → Repository)
- Autenticação e Autorização com JWT e Spring Security
- Criptografia de senhas com BCrypt
- Validações de negócio e integridade referencial (ex: bloqueio de venda sem estoque)
- Tratamento global de exceções padronizado
- Migrations de banco de dados versionadas com Flyway
- Padrão DTO com Records (Java 14+)
- Suite de testes automatizados (Unitários e de Integração)

### ✨ Destaques Técnicos (Frontend)
- Arquitetura Moderna com **Standalone Components** (Angular 17+)
- **Reactive Forms** com validação robusta e feedback visual em tempo real
- **Interceptors** para injeção automática e transparente do token JWT
- Programação reativa com **RxJS** (ex: `switchMap` para encadear criação de produto + upload de imagem)
- Controle de acesso na UI (RBAC): rotas e botões visíveis apenas para `ADMINISTRADOR`

</td>
<td width="50%">

### 🚦 Status do Projeto
- **Backend (Core):** ✅ Completo e Funcional
- **Segurança (JWT):** ✅ Completo e Funcional
- **Carrinho e Pedidos:** ✅ Completo e Funcional
- **Upload de Imagens:** ✅ Completo e Funcional
- **Testes Automatizados:** ✅ Completo e Funcional (12 testes)
- **Documentação (Swagger):** ✅ Completo e Funcional
- **Frontend (Cliente):** ✅ Completo e Funcional (Catálogo, Carrinho, Checkout, Pedidos)
- **Frontend (Admin):** ✅ Completo e Funcional (Listagem, Cadastro com Upload, Exclusão)
- **Deploy:** 🚧 Planejado

### 📊 Métricas
- **Entidades:** 8 (User, Category, Product, ProductVariant, Cart, CartItem, Order, OrderItem)
- **Endpoints:** 30+ rotas RESTful protegidas e públicas
- **Testes:** 12 testes automatizados (unitários + integração)
- **Frontend:** 10+ componentes, 4 serviços core, roteamento com guards

</td>
</tr>
</table>

-------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🛠️ Stack Tecnológica

<table>
<tr>
<th>Categoria</th>
<th>Tecnologia</th>
<th>Versão</th>
<th>Propósito</th>
</tr>
<tr>
<td rowspan="6"><strong>Backend</strong></td>
<td>Java</td>
<td>17 LTS</td>
<td>Linguagem principal</td>
</tr>
<tr>
<td>Spring Boot</td>
<td>3.3.x</td>
<td>Framework web e Injeção de Dependência</td>
</tr>
<tr>
<td>Spring Security + JJWT</td>
<td>6.x / 0.12.x</td>
<td>Autenticação, Autorização e Tokens JWT</td>
</tr>
<tr>
<td>Spring Data JPA</td>
<td>3.x</td>
<td>Persistência e ORM</td>
</tr>
<tr>
<td>BCrypt</td>
<td>Nativo</td>
<td>Hashing seguro de senhas</td>
</tr>
<tr>
<td>Multipart File</td>
<td>Nativo</td>
<td>Upload e validação de arquivos</td>
</tr>
<tr>
<td rowspan="3"><strong>Banco de Dados</strong></td>
<td>PostgreSQL</td>
<td>12+</td>
<td>SGBD principal (Produção/Dev)</td>
</tr>
<tr>
<td>H2 Database</td>
<td>2.x</td>
<td>Banco em memória para testes automatizados</td>
</tr>
<tr>
<td>Flyway</td>
<td>10.x</td>
<td>Versionamento de schema</td>
</tr>
<tr>
<td rowspan="4"><strong>Frontend</strong></td>
<td>Angular</td>
<td>17+</td>
<td>Framework SPA (Single Page Application)</td>
</tr>
<tr>
<td>TypeScript</td>
<td>5.x</td>
<td>Tipagem estática e segurança de código</td>
</tr>
<tr>
<td>RxJS</td>
<td>7.x</td>
<td>Programação reativa e gerenciamento de fluxos assíncronos</td>
</tr>
<tr>
<td>Angular Material / CSS3</td>
<td>Nativo</td>
<td>Estilização moderna e responsiva</td>
</tr>
<tr>
<td rowspan="2"><strong>Testes</strong></td>
<td>JUnit 5 + Mockito</td>
<td>5.x</td>
<td>Testes unitários e de integração</td>
</tr>
<tr>
<td>Spring Boot Test + MockMvc</td>
<td>3.3.x</td>
<td>Testes de integração de rotas HTTP</td>
</tr>
<tr>
<td rowspan="2"><strong>Ferramentas</strong></td>
<td>Maven / npm</td>
<td>3.6+ / 10+</td>
<td>Gerenciamento de dependências</td>
</tr>
<tr>
<td>Git</td>
<td>2.x</td>
<td>Controle de versão</td>
</tr>
</table>

-------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- JDK 17+ e Maven instalados.
- Node.js 18+ e Angular CLI (`npm install -g @angular/cli`).
- PostgreSQL rodando na porta `5432` (ajuste o `application.properties` se necessário).

### 1. Iniciar o Backend
Abra um terminal e execute:

cd ~/Área\ de\ Trabalho/Vendas/backend/api
mvn spring-boot:run

### 2. Iniciar o Frontend

cd ~/Área\ de\ Trabalho/Vendas/frontend
ng serve -o


(A aplicação abrirá automaticamente em `http://localhost:4200`)

-------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🔑 Credenciais de Teste

O sistema utiliza controle de acesso (RBAC). Você pode criar novos usuários via endpoint `/api/auth/cadastrar` ou usar os perfis abaixo no Frontend:

| Perfil | Email | Senha | Acesso |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@teste.com` | `123456` | Painel Admin (CRUD Produtos) e Loja |
| **Cliente** | `lucas@teste.com` | `123456` | Apenas Loja (Catálogo, Carrinho, Pedidos) |

---

## 🌐 API Endpoints e Documentação

> **💡 Dica Profissional:** A documentação interativa completa está disponível em:  
> 👉 `http://localhost:8080/swagger-ui/index.html`  
> *(Use o botão "Authorize" no topo direito para inserir seu token JWT: `Bearer <seu_token>`)*

*(A tabela completa de endpoints do Backend permanece a mesma: Autenticação, Produtos, Categorias, Carrinho e Pedidos, todos protegidos conforme a coluna "Acesso" no Swagger).*

-------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🧪 Testes Automatizados

O projeto backend possui **12 testes automatizados** divididos em 3 categorias:
- **Unitários:** `OrderServiceTest` (Valida regras de negócio com Mockito).
- **Integração de Rotas:** `AuthIntegrationTest`, `ProductIntegrationTest`, `CartIntegrationTest`, `OrderIntegrationTest` (Testes ponta a ponta com MockMvc e H2).
- **Sanidade:** `ApiApplicationTests` (Garante que o contexto do Spring Boot carrega corretamente).

**Para rodar os testes:**
```bash
cd backend/api
mvn clean test

-------------------------------------------------------------------------------------------------------------------------------------------------------------


Vendas/
├── backend/
│   └── api/
│       ├── src/main/java/com/sualoja/api/
│       │   ├── config/              # Configurações (CORS, Security, JWT, OpenAPI)
│       │   ├── controller/          # Endpoints REST
│       │   ├── dto/                 # Data Transfer Objects (Request/Response)
│       │   ├── exception/           # Tratamento global de erros
│       │   ├── model/               # Entidades JPA e Enums
│       │   ├── repository/          # Interfaces Spring Data JPA
│       │   ├── security/            # Filtro JWT e UserDetailsService
│       │   └── service/             # Regras de negócio (FileStorage, Cart, Order)
│       ├── src/main/resources/
│       │   ├── application.yml      # Configuração da aplicação (PostgreSQL)
│       │   └── db/migration/        # Scripts de versionamento Flyway
│       ├── src/test/                # Testes automatizados (JUnit 5, Mockito, H2, MockMvc)
│       └── uploads/                 # Diretório local para armazenamento de imagens
│
├── frontend/
│   └── src/app/
│       ├── core/                    # Serviços (Auth, Product, Cart, Order), Interceptors, Models
│       ├── features/                # Componentes de UI (Login, Produtos, Carrinho, Pedidos, Admin)
│       └── app.routes.ts            # Configuração de rotas e Guards de proteção
│
└── README.md


-------------------------------------------------------------------------------------------------------------------------------------------------------------


✅ Funcionalidades Implementadas (Resumo Full Stack)

    CRUD completo de Categorias, Produtos e Variações (Backend + Frontend Admin)
    Upload de imagens de produtos com validação de tipo, tamanho e nomeação única (UUID)
    Autenticação JWT com Interceptor no Angular (injeção automática de token)
    Proteção de rotas por perfil (UI e Backend: ADMINISTRADOR vs CLIENTE)
    Carrinho de compras com cálculo automático e validação de estoque em tempo real
    Sistema de pedidos com baixa automática e transacional de estoque (Checkout)
    Histórico de pedidos ("Meus Pedidos") para o cliente
    Tratamento global de exceções e feedback visual amigável no Frontend
    Suite de testes automatizados e Documentação interativa com Swagger/OpenAPI

🔜 Próximos Passos (Backlog)

    Editar Produto: Tela no Admin para alterar preço, estoque e trocar a imagem de um produto existente.
    Dashboard Administrativo: Métricas visuais (Total de vendas, Produtos com estoque baixo).
    Integração com Gateway de Pagamento: (ex: Mercado Pago ou Stripe).
    Deploy em Nuvem: Backend (Render/Railway), Frontend (Vercel/Netlify) e Banco (Neon/Supabase).
    CI/CD: Pipeline de integração contínua com GitHub Actions.
