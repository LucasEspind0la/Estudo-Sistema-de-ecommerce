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

----------------------------------------------------------------------------------------------------------------------------------------------------------


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
- **Testes:** 8 testes automatizados (unitários + integração)
- **Banco:** PostgreSQL com migrations versionadas (Flyway) + H2 para testes isolados

</td>
</tr>
</table>

----------------------------------------------------------------------------------------------------------------------------------------------------------


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
<td>Spring Boot Test + MockMvc</td>
<td>3.3.x</td>
<td>Testes de integração de rotas HTTP</td>
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

----------------------------------------------------------------------------------------------------------------------------------------------------------


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

### Categorias
| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|--------|
| `GET` | `/api/categorias` | Listar todas as categorias | Público |
| `GET` | `/api/categorias/{id}` | Buscar categoria por ID | Público |
| `POST` | `/api/categorias` | Criar nova categoria | ADMIN |
| `PUT` | `/api/categorias/{id}` | Atualizar categoria | ADMIN |
| `DELETE` | `/api/categorias/{id}` | Deletar categoria | ADMIN |

### Carrinho de Compras
| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|--------|
| `GET` | `/api/carrinho` | Obter carrinho do usuário logado | Autenticado |
| `POST` | `/api/carrinho/adicionar` | Adicionar item ao carrinho | Autenticado |
| `PUT` | `/api/carrinho/itens/{itemId}` | Atualizar quantidade de um item | Autenticado |
| `DELETE` | `/api/carrinho/itens/{itemId}` | Remover item do carrinho | Autenticado |
| `DELETE` | `/api/carrinho/limpar` | Esvaziar carrinho completo | Autenticado |

### Pedidos
| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|--------|
| `POST` | `/api/pedidos/finalizar` | Finalizar compra (Checkout com baixa de estoque) | Autenticado |
| `GET` | `/api/pedidos/meus-pedidos` | Listar histórico de pedidos do usuário | Autenticado |
| `GET` | `/api/pedidos/{pedidoId}` | Buscar detalhes de um pedido específico | Autenticado |
| `PATCH` | `/api/pedidos/{pedidoId}/status` | Alterar status do pedido | ADMIN |

----------------------------------------------------------------------------------------------------------------------------------------------------------

## 🧪 Testes Automatizados

O projeto possui **8 testes automatizados** divididos em 3 categorias:

### Testes Unitários (Lógica de Negócio Isolada)
- `OrderServiceTest`: Valida regras de negócio do pedido com Mockito

### Testes de Integração de Rotas (Ponta a Ponta com MockMvc)
- `ProductIntegrationTest`: Testa criação de produtos, erros de validação e upload de imagens
- `CartIntegrationTest`: Testa adição ao carrinho e validação de estoque
- `OrderIntegrationTest`: Testa fluxo completo de finalização de pedido com baixa de estoque

### Teste de Contexto (Sanidade)
- `ApiApplicationTests`: Garante que o contexto do Spring Boot carrega corretamente

**Para rodar os testes:**
```bash
mvn clean test

----------------------------------------------------------------------------------------------------------------------------------------------------------

📂 Estrutura do Projeto

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
│       │   └── service/             # Regras de negócio (FileStorage, Cart, Order)
│       ├── src/main/resources/
│       │   ├── application.yml      # Configuração da aplicação (PostgreSQL)
│       │   └── db/migration/        # Scripts de versionamento Flyway
│       ├── src/test/                # Testes automatizados (JUnit 5, Mockito, H2, MockMvc)
│       └── uploads/                 # Diretório local para armazenamento de imagens
├── frontend/                        # 🚧 Em planejamento
└── README.md

⚙️ Pré-requisitos

    Java 17+
    Maven 3.6+
    PostgreSQL 12+

----------------------------------------------------------------------------------------------------------------------------------------------------------


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
    Suite de testes automatizados (Unitários com Mockito e de Integração com H2/MockMvc)
    Documentação interativa da API com Swagger/OpenAPI (SpringDoc)
