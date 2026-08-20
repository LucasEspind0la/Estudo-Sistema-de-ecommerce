# 🛒 Sistema de Vendas - API RESTful

<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.x-brightgreen?style=for-the-badge&logo=spring)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue?style=for-the-badge&logo=postgresql)
![Maven](https://img.shields.io/badge/Maven-3.6+-red?style=for-the-badge&logo=apache-maven)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**API RESTful robusta para gerenciamento de e-commerce, desenvolvida com foco em boas práticas, código limpo e arquitetura em camadas.**

</div>

---

## 📋 Visão Geral do Projeto

<table>
<tr>
<td width="50%">

### 🎯 Objetivo
Sistema completo de vendas online para gerenciamento de produtos com variações (tamanho, cor, preço, estoque), servindo como material de estudo e portfólio profissional.

### ✨ Destaques Técnicos
- ✅ Arquitetura em camadas (Controller → Service → Repository)
- ✅ Validações de negócio e integridade referencial
- ✅ Tratamento global de exceções
- ✅ Migrations com Flyway
- ✅ Padrão DTO com Records (Java 14+)
- ✅ Código em português (variáveis e métodos)

</td>
<td width="50%">

### 🚀 Status do Projeto
**Backend:** ✅ Completo e Funcional  
**Frontend:** 🚧 Em Desenvolvimento  
**Autenticação:** 🚧 Próximos Passos  
**Deploy:** 📋 Planejado

### 📊 Métricas
- **Entidades:** 4 (User, Category, Product, ProductVariant)
- **Endpoints:** 15+ rotas RESTful
- **Cobertura:** CRUD completo de Categorias, Produtos e Variações
- **Banco:** PostgreSQL com migrations versionadas

</td>
</tr>
</table>

---

## 🛠️ Stack Tecnológica

<table>
<tr>
<th>Categoria</th>
<th>Tecnologia</th>
<th>Versão</th>
<th>Propósito</th>
</tr>
<tr>
<td rowspan="4"><strong>Backend</strong></td>
<td>Java</td>
<td>17 LTS</td>
<td>Linguagem principal</td>
</tr>
<tr>
<td>Spring Boot</td>
<td>3.3.x</td>
<td>Framework web e DI</td>
</tr>
<tr>
<td>Spring Data JPA</td>
<td>3.x</td>
<td>Persistência e ORM</td>
</tr>
<tr>
<td>Spring Security</td>
<td>6.x</td>
<td>Autenticação e autorização</td>
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
<td>ORM e mapeamento</td>
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
<td>Redução de boilerplate</td>
</tr>
<tr>
<td>Git</td>
<td>2.x</td>
<td>Controle de versão</td>
</tr>
<tr>
<td><strong>SO de Desenvolvimento</strong></td>
<td>Ubuntu</td>
<td>20.04 LTS</td>
<td>Ambiente de desenvolvimento</td>
</tr>
</table>

---

## 📡 API Endpoints

### 📂 Categorias
<table>
<tr>
<th>Método</th>
<th>Endpoint</th>
<th>Descrição</th>
<th>Autenticação</th>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/api/categorias</code></td>
<td>Criar nova categoria</td>
<td>Pública</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/api/categorias</code></td>
<td>Listar todas as categorias</td>
<td>Pública</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/api/categorias/{id}</code></td>
<td>Buscar categoria por ID</td>
<td>Pública</td>
</tr>
<tr>
<td><code>PUT</code></td>
<td><code>/api/categorias/{id}</code></td>
<td>Atualizar categoria</td>
<td>Pública</td>
</tr>
<tr>
<td><code>DELETE</code></td>
<td><code>/api/categorias/{id}</code></td>
<td>Deletar categoria</td>
<td>Pública</td>
</tr>
</table>

### 📦 Produtos
<table>
<tr>
<th>Método</th>
<th>Endpoint</th>
<th>Descrição</th>
<th>Autenticação</th>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/api/produtos</code></td>
<td>Criar produto com variações</td>
<td>Pública</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/api/produtos</code></td>
<td>Listar todos os produtos</td>
<td>Pública</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/api/produtos/ativos</code></td>
<td>Listar apenas produtos ativos</td>
<td>Pública</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/api/produtos/{id}</code></td>
<td>Buscar produto com variações</td>
<td>Pública</td>
</tr>
<tr>
<td><code>PUT</code></td>
<td><code>/api/produtos/{id}</code></td>
<td>Atualizar produto</td>
<td>Pública</td>
</tr>
<tr>
<td><code>PATCH</code></td>
<td><code>/api/produtos/{id}/alternar-ativo</code></td>
<td>Ativar/Desativar produto</td>
<td>Pública</td>
</tr>
<tr>
<td><code>DELETE</code></td>
<td><code>/api/produtos/{id}</code></td>
<td>Deletar produto</td>
<td>Pública</td>
</tr>
</table>

### 🏷️ Variações de Produtos
<table>
<tr>
<th>Método</th>
<th>Endpoint</th>
<th>Descrição</th>
<th>Autenticação</th>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/api/produtos/{id}/variacoes</code></td>
<td>Adicionar variação a um produto</td>
<td>Pública</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/api/produtos/{id}/variacoes</code></td>
<td>Listar variações de um produto</td>
<td>Pública</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/api/produtos/{idProduto}/variacoes/{idVariacao}</code></td>
<td>Buscar variação específica</td>
<td>Pública</td>
</tr>
<tr>
<td><code>PUT</code></td>
<td><code>/api/produtos/{idProduto}/variacoes/{idVariacao}</code></td>
<td>Atualizar variação</td>
<td>Pública</td>
</tr>
<tr>
<td><code>DELETE</code></td>
<td><code>/api/produtos/{idProduto}/variacoes/{idVariacao}</code></td>
<td>Deletar variação</td>
<td>Pública</td>
</tr>
</table>

-----------------------------------------------------------------------------------------------------


## 📂 Estrutura do Projeto

sistema-vendas/
├── backend/
│   └── api/
│       ├── src/main/java/com/sualoja/api/
│       │   ├── config/              # Configurações (CORS, Security)
│       │   ├── controller/          # Endpoints REST
│       │   ├── dto/                 # Data Transfer Objects
│       │   │   ├── request/         # DTOs de entrada
│       │   │   └── response/        # DTOs de saída
│       │   ├── exception/           # Tratamento de erros
│       │   ├── model/               # Entidades e Enums
│       │   │   ├── entity/          # Classes JPA
│       │   │   └── enums/           # Enumerações
│       │   ├── repository/          # Interfaces JPA
│       │   └── service/             # Regras de negócio
│       └── src/main/resources/
│           ├── application.yml      # Configuração da aplicação
│           └── db/migration/        # Scripts Flyway
├── frontend/                        # (Em desenvolvimento)
│   └── src/app/
│       ├── core/                    # Serviços, guards, interceptors
│       ├── shared/                  # Componentes reutilizáveis
│       └── features/                # Módulos da aplicação
└── README.md



-----------------------------------------------------------------------------------------------------




### Pré-requisitos
- Java 17+
- Maven 3.6+
- PostgreSQL 12+



-----------------------------------------------------------------------------------------------------


     Funcionalidades Implementadas
    
✅ Concluído

    CRUD completo de Categorias
    CRUD completo de Produtos
    CRUD completo de Variações (cor, tamanho, SKU, preço, estoque)
    Validação de SKU único
    Tratamento global de exceções
    Migrations com Flyway
    Configuração CORS
    Arquitetura em camadas
    DTOs com Records (Java 14+)
    Variáveis e métodos em português

🚧 Próximos Passos

    Autenticação JWT (Login de Admin e Cliente)
    Proteção de rotas por perfil (ADMINISTRADOR vs CLIENTE)
    Carrinho de Compras
    Sistema de Pedidos
    Frontend Angular completo
    Upload de imagens de produtos
    Pagamento integrado
    Deploy em nuvem



    


    
