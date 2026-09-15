cat << 'EOF' > ~/Área\ de\ Trabalho/Vendas/README.md
# 🛒 Sistema de E-commerce Full Stack - API RESTful & Angular

<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.x-brightgreen?style=for-the-badge&logo=spring)
![Angular](https://img.shields.io/badge/Angular-17+-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Security-black?style=for-the-badge&logo=jsonwebtokens)

</div>

Sistema completo de e-commerce Full Stack, desenvolvido com **Spring Boot** (Backend) e **Angular** (Frontend). O projeto implementa um fluxo real de vendas, desde o gerenciamento de produtos pelo administrador até a finalização de compra pelo cliente, com autenticação segura via JWT e controle de acesso baseado em papéis (RBAC).

---

## 📸 Screenshots do Sistema

### 🔐 Tela de Login/Cadastro
<div align="center">
<img src="docs/screenshots/login.png" alt="Tela de Login" width="800"/>
</div>


### 🏪 Página Inicial da Loja
<div align="center">
<img src="docs/screenshots/pageInicial.png" alt="Página Inicial" width="800"/>
</div>


### 🛍️ Catálogo de Produtos
<div align="center">
<img src="docs/screenshots/produtos.png" alt="Catálogo de Produtos" width="800"/>
</div>


### 📊 Painel Administrativo (Dashboard)
<div align="center">
<img src="docs/screenshots/dashboard.png" alt="Dashboard Administrativo" width="800"/>
</div>


### 🛒 Carrinho de Compras
<div align="center">
<img src="docs/screenshots/carrinho.png" alt="Carrinho de Compras" width="800"/>
</div>

---

## ✨ Funcionalidades Principais

### 👤 Módulo do Cliente
- ✅ Cadastro e Login com JWT
- ✅ Catálogo de Produtos com Hero Carousel
- ✅ Carrinho de Compras com "Comprar Agora"
- ✅ Checkout com baixa automática de estoque
- ✅ Histórico de Pedidos com detalhes

### ️ Módulo do Administrador
- ✅ Dashboard com métricas (Faturamento, Pedidos, Estoque Baixo)
- ✅ CRUD Completo de Produtos com Upload de Imagens
- ✅ CRUD de Categorias
- ✅ Gestão de Status de Pedidos
- ✅ Controle de acesso RBAC

---


## 🛠️ Stack Tecnológica

| Categoria | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Backend** | Java 17, Spring Boot 3.3.x | API RESTful |
| **Segurança** | Spring Security, JJWT, BCrypt | Autenticação JWT |
| **Persistência** | Spring Data JPA, PostgreSQL | Banco de dados |
| **Frontend** | Angular 17+, TypeScript, RxJS | SPA moderna |
| **Testes** | JUnit 5, Mockito, MockMvc | Testes automatizados |

---



Vendas/
│
├── 📁 backend/
│   └── 📁 api/
│       ├── 📁 .mvn/wrapper/              # Wrapper do Maven (build)
│       ├── 📁 src/
│       │   ├── 📁 main/
│       │   │   ├── 📁 java/com/sualoja/api/
│       │   │   │   ├── 📁 config/                    # Configurações globais
│       │   │   │   │   ├── OpenApiConfig.java        # Swagger/OpenAPI
│       │   │   │   │   ├── SecurityConfig.java       # Spring Security + JWT
│       │   │   │   │   └── WebConfig.java            # CORS e recursos estáticos
│       │   │   │   │
│       │   │   │   ├── 📁 controller/                # Endpoints REST
│       │   │   │   │   ├── AuthController.java       # Login/Cadastro
│       │   │   │   │   ├── CartController.java       # Carrinho
│       │   │   │   │   ├── CategoryController.java   # Categorias
│       │   │   │   │   ├── DashboardController.java  # Métricas admin
│       │   │   │   │   ├── OrderController.java      # Pedidos
│       │   │   │   │   ├── ProductController.java    # Produtos
│       │   │   │   │   └── ProductVariantController.java # Variações
│       │   │   │   │
│       │   │   │   ├──  dto/                       # Data Transfer Objects
│       │   │   │   │   ├──  request/               # Requisições
│       │   │   │   │   │   ├── AddToCartRequest.java
│       │   │   │   │   │   ├── CadastroRequest.java
│       │   │   │   │   │   ├── CheckoutRequest.java
│       │   │   │   │   │   ├── CreateCategoryRequest.java
│       │   │   │   │   │   ├── CreateProductRequest.java
│       │   │   │   │   │   ├── CreateProductVariantRequest.java
│       │   │   │   │   │   ├── LoginRequest.java
│       │   │   │   │   │   ├── ProductRequest.java
│       │   │   │   │   │   ├── ProductVariantRequest.java
│       │   │   │   │   │   ├── UpdateCartItemRequest.java
│       │   │   │   │   │   ├── UpdateCategoryRequest.java
│       │   │   │   │   │   ├── UpdateProductRequest.java
│       │   │   │   │   │   └── UpdateProductVariantRequest.java
│       │   │   │   │   │
│       │   │   │   │   └── 📁 response/              # Respostas
│       │   │   │   │       ├── AuthResponse.java
│       │   │   │   │       ├── CartItemResponse.java
│       │   │   │   │       ├── CartResponse.java
│       │   │   │   │       ├── CategoryResponse.java
│       │   │   │   │       ├── DashboardResponse.java
│       │   │   │   │       ├── OrderItemResponse.java
│       │   │   │   │       ├── OrderResponse.java
│       │   │   │   │       ├── ProductResponse.java
│       │   │   │   │       └── ProductVariantResponse.java
│       │   │   │   │
│       │   │   │   ├── 📁 exception/                 # Tratamento de erros
│       │   │   │   │   ├── GlobalExceptionHandler.java
│       │   │   │   │   └── ResourceNotFoundException.java
│       │   │   │   │
│       │   │   │   ├── 📁 model/                     # Entidades e Enums
│       │   │   │   │   ├── 📁 entity/
│       │   │   │   │   │   ├── Cart.java
│       │   │   │   │   │   ├── CartItem.java
│       │   │   │   │   │   ├── Category.java
│       │   │   │   │   │   ├── Order.java
│       │   │   │   │   │   ├── OrderItem.java
│       │   │   │   │   │   ├── Product.java
│       │   │   │   │   │   ├── ProductVariant.java
│       │   │   │   │   │   └── User.java
│       │   │   │   │   │
│       │   │   │   │   └── 📁 enums/
│       │   │   │   │       ├── CartStatus.java
│       │   │   │   │       ├── OrderStatus.java
│       │   │   │   │       └── UserRole.java
│       │   │   │   │
│       │   │   │   ├── 📁 repository/                # Spring Data JPA
│       │   │   │   │   ├── CartItemRepository.java
│       │   │   │   │   ├── CartRepository.java
│       │   │   │   │   ├── CategoryRepository.java
│       │   │   │   │   ├── OrderItemRepository.java
│       │   │   │   │   ├── OrderRepository.java
│       │   │   │   │   ├── ProductRepository.java
│       │   │   │   │   ├── ProductVariantRepository.java
│       │   │   │   │   └── UserRepository.java
│       │   │   │   │
│       │   │   │   ├── 📁 security/                  # Autenticação JWT
│       │   │   │   │   ├── CustomUserDetailsService.java
│       │   │   │   │   ├── JwtAuthenticationFilter.java
│       │   │   │   │   └── JwtService.java
│       │   │   │   │
│       │   │   │   ├── 📁 service/                   # Regras de negócio
│       │   │   │   │   ├── AuthService.java
│       │   │   │   │   ├── CartService.java
│       │   │   │   │   ├── CategoryService.java
│       │   │   │   │   ├── FileStorageService.java
│       │   │   │   │   ├── OrderService.java
│       │   │   │   │   ├── ProductService.java
│       │   │   │   │   └── ProductVariantService.java
│       │   │   │   │
│       │   │   │   └── ApiApplication.java           # Classe principal
│       │   │   │
│       │   │   └── 📁 resources/
│       │   │       ├── application.yml               # Configuração principal
│       │   │       └──  db/migration/              # Flyway (versionamento)
│       │   │           ├── V1__create_initial_tables.sql
│       │   │           └── V4__add_image_url_to_products.sql
│       │   │
│       │   └── 📁 test/                              # Testes automatizados
│       │       ├── 📁 java/com/sualoja/api/
│       │       │   ├── ApiApplicationTests.java
│       │       │   ├── 📁 integration/
│       │       │   │   ├── AuthIntegrationTest.java
│       │       │   │   ├── CartIntegrationTest.java
│       │       │   │   ├── OrderIntegrationTest.java
│       │       │   │   └── ProductIntegrationTest.java
│       │       │   ── 📁 service/
│       │       │       └── OrderServiceTest.java
│       │       └── 📁 resources/
│       │           └── application.yml               # Config de testes (H2)
│       │
│       ├── 📁 uploads/produtos/                      # Imagens enviadas
│       ├── pom.xml                                   # Dependências Maven
│       └── configuracao-testes-h2.yml                # Config H2 para testes
│
├── 📁 frontend/
│   ├── 📁 public/                                    # Assets estáticos
│   │   ── favicon.ico
│   │
│   ├── 📁 src/
│   │   ├── 📁 app/
│   │   │   ├── 📁 core/                              # Camada de infraestrutura
│   │   │   │   ├── 📁 interceptors/
│   │   │   │   │   ── auth.interceptor.ts           # Injeta JWT automaticamente
│   │   │   │   │
│   │   │   │   └── 📁 services/                      # Comunicação com API
│   │   │   │       ├── auth.service.ts
│   │   │   │       ├── cart.service.ts
│   │   │   │       ├── category.service.ts
│   │   │   │       ├── dashboard.service.ts
│   │   │   │       ├── order.service.ts
│   │   │   │       └── product.service.ts
│   │   │   │
│   │   │   ├── 📁 features/                          # Componentes de UI
│   │   │   │   ├── 📁 admin/                         # Painel administrativo
│   │   │   │   │   ├── admin-categories.component.ts
│   │   │   │   │   ├── admin-category-form.component.ts
│   │   │   │   │   ├── admin-dashboard.component.ts
│   │   │   │   │   ├── admin-orders.component.ts
│   │   │   │   │   ├── admin-product-form.component.ts
│   │   │   │   │   └── admin-products.component.ts
│   │   │   │   │
│   │   │   │   ├──  cart/                          # Carrinho de compras
│   │   │   │   │   └── cart.component.ts
│   │   │   │   │
│   │   │   │   ├──  login/                         # Autenticação
│   │   │   │   │   └── login.component.ts
│   │   │   │   │
│   │   │   │   ├──  orders/                        # Pedidos do cliente
│   │   │   │   │   ├── order-details.component.ts
│   │   │   │   │   └── orders.component.ts
│   │   │   │   │
│   │   │   │   ├── 📁 products/                      # Catálogo
│   │   │   │   │   └── products.component.ts
│   │   │   │   │
│   │   │   │   └── 📁 shared/                        # Componentes reutilizáveis
│   │   │   │       └── hero-carousel.component.ts
│   │   │   │
│   │   │   ├── app.component.ts                      # Componente raiz
│   │   │   ├── app.config.ts                         # Configuração Angular
│   │   │   └── app.routes.ts                         # Rotas da aplicação
│   │   │
│   │   ├── index.html                                # HTML principal
│   │   ├── main.ts                                   # Bootstrap Angular
│   │   └── styles.scss                               # Estilos globais
│   │
│   ├── angular.json                                  # Config do Angular CLI
│   ├── package.json                                  # Dependências npm
│   ├── proxy.conf.json                               # Proxy para backend
│   ├── tsconfig.json                                 # Config TypeScript
│   ├── tsconfig.app.json
│   └── tsconfig.spec.json
│
├── 📁 docs/
│   └── 📁 screenshots/                               # Imagens do README
│       ├── carrinho.png
│       ├── criacaoDeCategorias.png
│       ├── criacaoDeProdutos.png
│       ├── dashboard.png
│       ├── login.png
│       ├── pageInicial.png
│       └── produtos.png
│
└── README.md                                         # Documentação principal



---



## 🚀 Como Rodar o Projeto

### Pré-requisitos
- JDK 17+ e Maven
- Node.js 18+ e Angular CLI
- PostgreSQL rodando na porta 5432


1. backend


cd backend/api
mvn spring-boot:run


2. Frontend

cd frontend
ng serve -o



Admin:
	
admin@teste.com
	
123456


Cliente:
	
lucas@teste.com
	
123456


---


🔜 Próximos Passos

    Deploy em nuvem (Vercel + Render)
    Integração com gateway de pagamento
    Busca e filtros avançados
    Notificações Toast

	
