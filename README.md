# Estudo de Sistema de Vendas - API RESTful 


<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.x-brightgreen?style=for-the-badge&logo=spring)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Security-black?style=for-the-badge&logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**API RESTful robusta e segura para gerenciamento de e-commerce, desenvolvida com foco em boas práticas, código limpo, autenticação JWT e arquitetura em camadas.**

</div>


--------------------------------------------------------------------------------------------------------------



## 📋 Visão Geral do Projeto


<table>
<tr>
<td width="50%">


### 🎯 Objetivo
Sistema completo de vendas online para gerenciamento de produtos com variações (tamanho, cor, preço, estoque), servindo como material de estudo e portfólio profissional.


--------------------------------------------------------------------------------------------------------------


### ✨ Destaques Técnicos



- ✅ Arquitetura em camadas (Controller → Service → Repository)
- ✅ Autenticação e Autorização com JWT e Spring Security
- ✅ Criptografia de senhas com BCrypt
- ✅ Controle de acesso baseado em funções (RBAC: ADMIN vs CLIENTE)
- ✅ Validações de negócio e integridade referencial
- ✅ Tratamento global de exceções
- ✅ Migrations com Flyway
- ✅ Padrão DTO com Records (Java 14+)

</td>
<td width="50%">


--------------------------------------------------------------------------------------------------------------


### 🚀 Status do Projeto



**Backend (Core):** ✅ Completo e Funcional  
**Segurança (JWT):** ✅ Completo e Funcional  
**Frontend:** 🚧 Em Desenvolvimento  
**Carrinho/Pedidos:** 📋 Planejado  
**Deploy:** 📋 Planejado

### 📊 Métricas
- **Entidades:** 4 (User, Category, Product, ProductVariant)
- **Endpoints:** 20+ rotas RESTful protegidas e públicas
- **Cobertura:** CRUD completo com regras de negócio
- **Banco:** PostgreSQL com migrations versionadas

</td>
</tr>
</table>

--------------------------------------------------------------------------------------------------------------

## 🛠️ Stack Tecnológica

<table>
<tr>
<th>Categoria</th>
<th>Tecnologia</th>
<th>Versão</th>
<th>Propósito</th>
</tr>
<tr>
<td rowspan="5"><strong>Backend</strong></td>
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
<td rowspan="3"><strong>Banco de Dados</strong></td>
<td>PostgreSQL</td>
<td>12+</td>
<td>SGBD principal</td>
</tr>
<tr>
<td>Flyway</td>
<td>10.x</td>
<td>Versionamento de schema</td>
</tr>
<tr>
<td>Hibernate</td>
<td>6.x</td>
<td>ORM e mapeamento objeto-relacional</td>
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


--------------------------------------------------------------------------------------------------------------


## 📡 API Endpoints

> **Nota sobre Autenticação:** Para rotas marcadas com 🔒 **ADMIN**, é obrigatório enviar o cabeçalho:  
> `Authorization: Bearer <seu_token_jwt_aqui>`


--------------------------------------------------------------------------------------------------------------


### 🔐 Autenticação



<table>
<tr>
<th>Método</th>
<th>Endpoint</th>
<th>Descrição</th>
<th>Acesso</th>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/api/auth/cadastrar</code></td>
<td>Cadastrar novo usuário (Admin ou Cliente)</td>
<td>🌐 Público</td>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/api/auth/login</code></td>
<td>Autenticar e receber token JWT</td>
<td>🌐 Público</td>
</tr>
</table>


--------------------------------------------------------------------------------------------------------------


### 📂 Categorias



<table>
<tr>
<th>Método</th>
<th>Endpoint</th>
<th>Descrição</th>
<th>Acesso</th>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/api/categorias</code></td>
<td>Listar todas as categorias</td>
<td>🌐 Público</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/api/categorias/{id}</code></td>
<td>Buscar categoria por ID</td>
<td>🌐 Público</td>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/api/categorias</code></td>
<td>Criar nova categoria</td>
<td>🔒 ADMIN</td>
</tr>
<tr>
<td><code>PUT</code></td>
<td><code>/api/categorias/{id}</code></td>
<td>Atualizar categoria</td>
<td>🔒 ADMIN</td>
</tr>
<tr>
<td><code>DELETE</code></td>
<td><code>/api/categorias/{id}</code></td>
<td>Deletar categoria</td>
<td>🔒 ADMIN</td>
</tr>
</table>


--------------------------------------------------------------------------------------------------------------

### 📦 Produtos


<table>
<tr>
<th>Método</th>
<th>Endpoint</th>
<th>Descrição</th>
<th>Acesso</th>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/api/produtos</code></td>
<td>Listar todos os produtos</td>
<td>🌐 Público</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/api/produtos/ativos</code></td>
<td>Listar apenas produtos ativos</td>
<td>🌐 Público</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/api/produtos/{id}</code></td>
<td>Buscar produto com suas variações</td>
<td>🌐 Público</td>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/api/produtos</code></td>
<td>Criar produto com variações</td>
<td>🔒 ADMIN</td>
</tr>
<tr>
<td><code>PUT</code></td>
<td><code>/api/produtos/{id}</code></td>
<td>Atualizar dados do produto</td>
<td>🔒 ADMIN</td>
</tr>
<tr>
<td><code>PATCH</code></td>
<td><code>/api/produtos/{id}/alternar-ativo</code></td>
<td>Ativar/Desativar produto</td>
<td>🔒 ADMIN</td>
</tr>
<tr>
<td><code>DELETE</code></td>
<td><code>/api/produtos/{id}</code></td>
<td>Deletar produto</td>
<td>🔒 ADMIN</td>
</tr>
</table>

--------------------------------------------------------------------------------------------------------------

### 🏷️ Variações de Produtos

<table>
<tr>
<th>Método</th>
<th>Endpoint</th>
<th>Descrição</th>
<th>Acesso</th>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/api/produtos/{id}/variacoes</code></td>
<td>Listar variações de um produto</td>
<td>🌐 Público</td>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/api/produtos/{id}/variacoes</code></td>
<td>Adicionar variação a um produto</td>
<td>🔒 ADMIN</td>
</tr>
<tr>
<td><code>PUT</code></td>
<td><code>/api/produtos/{idProduto}/variacoes/{idVariacao}</code></td>
<td>Atualizar variação (preço, estoque, etc)</td>
<td>🔒 ADMIN</td>
</tr>
<tr>
<td><code>DELETE</code></td>
<td><code>/api/produtos/{idProduto}/variacoes/{idVariacao}</code></td>
<td>Deletar variação</td>
<td>🔒 ADMIN</td>
</tr>
</table>

--------------------------------------------------------------------------------------------------------------


## 📂 Estrutura do Projeto


sistema-vendas/
├── backend/
│   └── api/
│       ├── src/main/java/com/sualoja/api/
│       │   ├── config/              # Configurações (CORS, Security, JWT)
│       │   ├── controller/          # Endpoints REST
│       │   ├── dto/                 # Data Transfer Objects (Request/Response)
│       │   ├── exception/           # Tratamento global de erros
│       │   ├── model/               # Entidades JPA e Enums
│       │   ├── repository/          # Interfaces Spring Data JPA
│       │   ├── security/            # Filtro JWT e UserDetailsService
│       │   └── service/             # Regras de negócio
│       └── src/main/resources/
│           ├── application.yml      # Configuração da aplicação
│           └── db/migration/        # Scripts de versionamento Flyway
├── frontend/                        # (Em desenvolvimento)
│   └── src/app/
│       ├── core/                    # Serviços, guards, interceptors
│       ├── shared/                  # Componentes reutilizáveis
│       └── features/                # Módulos da aplicação (Auth, Products, etc)
└── README.md


--------------------------------------------------------------------------------------------------------------


Pré-requisitos

    Java 17+
    Maven 3.6+
    PostgreSQL 12+


--------------------------------------------------------------------------------------------------------------


🎯 Funcionalidades Implementadas
✅ Concluído

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

🚧 Próximos Passos

    Carrinho de Compras e Sistema de Pedidos
    Frontend Angular completo (consumindo a API com Interceptors)
    Upload de imagens de produtos
    Integração com Gateway de Pagamento (ex: Mercado Pago)
    Deploy em nuvem (Backend + Frontend + Banco)
