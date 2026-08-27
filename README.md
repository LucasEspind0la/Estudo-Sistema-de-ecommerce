# Estudo de Sistema de Vendas - API RESTful

<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.x-brightgreen?style=for-the-badge&logo=spring)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Security-black?style=for-the-badge&logo=jsonwebtokens)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge&logo=swagger)
![Testes](https://img.shields.io/badge/Testes-JUnit%20%26%20Mockito-yellow?style=for-the-badge&logo=junit5)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

API RESTful robusta e segura para gerenciamento de e-commerce, desenvolvida com foco em boas práticas, código limpo, autenticação JWT, testes automatizados, documentação interativa e arquitetura em camadas.

</div>

------------------------------------------------------------------------------------------------------------------------------------------------------

## 📖 Visão Geral do Projeto

<table>
<tr>
<td width="50%">

### 🎯 Objetivo
Sistema completo de vendas online para gerenciamento de produtos com variações (tamanho, cor, preço, estoque), carrinho de compras, ciclo de pedidos e upload de imagens, servindo como material de estudo avançado e portfólio profissional.

### ✨ Destaques Técnicos
- Arquitetura em camadas (Controller → Service → Repository)
- Autenticação e Autorização com JWT e Spring Security
- Criptografia de senhas com BCrypt
- Controle de acesso baseado em funções (RBAC: ADMINISTRADOR vs CLIENTE)
- Validações de negócio e integridade referencial (ex: bloqueio de venda sem estoque)
- Tratamento global de exceções padronizado
- Migrations de banco de dados versionadas com Flyway
- Padrão DTO com Records (Java 14+)
- **Documentação interativa com Swagger/OpenAPI**
- **Suite de testes automatizados (Unitários e de Integração)**

</td>
<td width="50%">

### 🚦 Status do Projeto
- **Backend (Core):** ✅ Completo e Funcional
- **Segurança (JWT):** ✅ Completo e Funcional
- **Carrinho e Pedidos:** ✅ Completo e Funcional
- **Upload de Imagens:** ✅ Completo e Funcional
- **Testes Automatizados:** ✅ Completo e Funcional
- **Documentação (Swagger):** ✅ Completo e Funcional
- **Frontend:** 🚧 Em Planejamento
- **Deploy:** 🚧 Planejado

### 📊 Métricas
- **Entidades:** 8 (User, Category, Product, ProductVariant, Cart, CartItem, Order, OrderItem)
- **Endpoints:** 30+ rotas RESTful protegidas e públicas
- **Cobertura:** CRUD completo, fluxo de checkout, baixa automática de estoque e upload de arquivos
- **Banco:** PostgreSQL com migrations versionadas (Flyway) + H2 para testes

</td>
</tr>
</table>

------------------------------------------------------------------------------------------------------------------------------------------------------

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
<td rowspan="2"><strong>Testes</strong></td>
<td>JUnit 5 + Mockito</td>
<td>5.x</td>
<td>Testes unitários e de integração</td>
</tr>
<tr>
<td>Spring Boot Test</td>
<td>3.3.x</td>
<td>Contexto de teste integrado</td>
</tr>
<tr>
<td rowspan="3"><strong>Ferramentas</strong></td>
<td>Maven</td>
<td>3.6+</td>
<td>Gerenciamento de dependências</td>
</tr>
<tr>
<td>Lombok</td>
<td>1.18.x</td>
<td>Redução de código boilerplate</td>
</tr>
<tr>
<td>Git</td>
<td>2.x</td>
<td>Controle de versão</td>
</tr>
</table>

------------------------------------------------------------------------------------------------------------------------------------------------------


## 🌐 API Endpoints e Documentação

> **💡 Dica Profissional:** A documentação interativa completa está disponível em:  
> 👉 `http://localhost:8080/swagger-ui/index.html`  
> *(Use o botão "Authorize" no topo direito para inserir seu token JWT: `Bearer <seu_token>`)*

### Autenticação
| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|--------|
| `POST` | `/api/auth/cadastrar` | Cadastrar novo usuário | Público |
| `POST` | `/api/auth/login` | Autenticar e receber token JWT | Público |

### Produtos
| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|--------|
| `GET` | `/api/produtos` | Listar todos os produtos | Público |
| `GET` | `/api/produtos/ativos` | Listar apenas produtos ativos | Público |
| `GET` | `/api/produtos/{id}` | Buscar produto com suas variações | Público |
| `POST` | `/api/produtos` | Criar produto com variações | ADMIN |
| `PUT` | `/api/produtos/{id}` | Atualizar dados do produto | ADMIN |
| `PUT` | `/api/produtos/{id}/imagem` | **Upload de imagem do produto** | ADMIN |
| `PATCH` | `/api/produtos/{id}/alternar-ativo` | Ativar/Desativar produto | ADMIN |
| `DELETE` | `/api/produtos/{id}` | Deletar produto | ADMIN |

*(Demais endpoints de Categorias, Carrinho e Pedidos estão detalhados na documentação Swagger)*

------------------------------------------------------------------------------------------------------------------------------------------------------

## 📂 Estrutura do Projeto

```text
sistema-vendas/
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
│       │   └── service/             # Regras de negócio (inclui FileStorage, Cart, Order)
│       ├── src/main/resources/
│       │   ├── application.yml      # Configuração da aplicação (PostgreSQL)
│       │   └── db/migration/        # Scripts de versionamento Flyway
│       ├── src/test/                # Testes automatizados (JUnit 5, Mockito, H2)
│       └── uploads/                 # Diretório local para armazenamento de imagens
├── frontend/                        # 🚧 Em planejamento
└── README.md




⚙️ Pré-requisitos

    Java 17+
    Maven 3.6+
    PostgreSQL 12+

🚀 Como Executar

    Clone o repositório: git clone https://github.com/LucasEspind0la/Estudo-Sistema-de-e-commerce-.git
    Configure o banco de dados PostgreSQL no application.yml.
    Execute as migrations (o Flyway roda automaticamente).
    Inicie a aplicação: mvn spring-boot:run
    Acesse a documentação: http://localhost:8080/swagger-ui/index.html

✅ Funcionalidades Implementadas

    CRUD completo de Categorias, Produtos e Variações
    Validação de SKU único e integridade referencial
    Tratamento global de exceções (GlobalExceptionHandler)
    Migrations de banco de dados com Flyway
    Configuração de CORS para frontend
    Arquitetura em camadas bem definida
    DTOs com Records (Java 14+)
    Autenticação JWT (Login e Cadastro)
    Criptografia de senhas com BCrypt
    Proteção de rotas por perfil (ADMINISTRADOR vs CLIENTE)
    Carrinho de compras com cálculo automático de subtotal e total
    Sistema de pedidos com baixa automática e transacional de estoque
    Validação de estoque em tempo real (impede venda de itens esgotados)
    Upload de imagens de produtos com validação de tipo, tamanho e nomeação única (UUID)
    Suite de testes automatizados (Unitários com Mockito e de Integração com H2)
    Documentação interativa da API com Swagger/OpenAPI (SpringDoc)

