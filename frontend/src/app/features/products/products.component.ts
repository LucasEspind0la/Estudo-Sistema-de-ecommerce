import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductService, Product } from '../../core/services/product.service';
import { CartService, AddToCartRequest } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

/**
 * Estende a interface Product apenas para fins de UI, 
 * permitindo armazenar estados temporários de cada card individualmente.
 */
export interface ProductUI extends Product {
  isAdding?: boolean;
  uiSuccessMessage?: string;
  uiErrorMessage?: string;
}

/**
 * Componente responsável por exibir o catálogo de produtos ativos.
 * 
 * Funcionalidades:
 * - Busca e exibe a lista de produtos ativos vindos da API.
 * - Calcula e exibe o menor preço entre as variantes de cada produto.
 * - Permite adicionar a primeira variante do produto ao carrinho com feedback visual isolado por card.
 */
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="products-container">
            <header class="header">
        <h1>Catálogo de Produtos</h1>
        <div class="header-actions">
          <button class="orders-btn" routerLink="/pedidos">📦 Meus Pedidos</button>
          <button class="cart-btn" routerLink="/carrinho">🛒 Carrinho</button>
          <button class="logout-btn" (click)="logout()">Sair</button>
        </div>
      </header>

      <div *ngIf="loading" class="loading">Carregando produtos...</div>
      
      <div *ngIf="!loading && products.length === 0" class="empty">
        Nenhum produto ativo encontrado.
      </div>

      <div class="products-grid">
        <div *ngFor="let product of products" class="product-card">
          <div class="product-image">
            <img 
              *ngIf="product.imagemUrl; else noImage" 
              [src]="product.imagemUrl" 
              [alt]="product.nome"
            >
            <ng-template #noImage>
              <div class="no-image">Sem Imagem</div>
            </ng-template>
          </div>
          <div class="product-info">
            <h3>{{ product.nome }}</h3>
            <p class="description">{{ product.descricao }}</p>
            <div class="price-section">
              <span class="price">
                A partir de {{ getLowestPrice(product.variantes) | currency:'BRL':'symbol':'1.2-2' }}
              </span>
            </div>
            
            <!-- Botão com estado isolado por produto -->
            <button 
              class="add-btn" 
              (click)="addToCart(product)"
              [disabled]="product.isAdding"
            >
              {{ product.isAdding ? 'Adicionando...' : 'Adicionar ao Carrinho' }}
            </button>
            
            <!-- Mensagens de Feedback isoladas por produto -->
            <p *ngIf="product.uiSuccessMessage" class="success-msg">{{ product.uiSuccessMessage }}</p>
            <p *ngIf="product.uiErrorMessage" class="error-msg">{{ product.uiErrorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .products-container { padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
    .header h1 { color: #2c3e50; margin: 0; }
    .header-actions { display: flex; gap: 1rem; }
    .cart-btn { padding: 0.5rem 1rem; background: #394055; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; text-decoration: none; }
    .cart-btn:hover { background: #2746a5; }
    .logout-btn { padding: 0.5rem 1rem; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
    .product-card { background: white; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
    .product-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
    .product-image { width: 100%; height: 200px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .product-image img { width: 100%; height: 100%; object-fit: cover; }
    .no-image { color: #999; font-size: 0.9rem; }
    .product-info { padding: 1.5rem; }
    .product-info h3 { margin: 0 0 0.5rem 0; color: #2c3e50; font-size: 1.2rem; }
    .description { color: #666; font-size: 0.9rem; margin-bottom: 1rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .price { font-size: 1.4rem; font-weight: 700; color: #27ae60; }
    .add-btn { width: 100%; padding: 0.75rem; background: #3498db; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; margin-top: 1rem; transition: background 0.2s; }
    .add-btn:hover:not(:disabled) { background: #2980b9; }
    .add-btn:disabled { background: #95a5a6; cursor: not-allowed; }
    .loading, .empty { text-align: center; padding: 3rem; color: #666; font-size: 1.1rem; }
    .success-msg { color: #27ae60; font-size: 0.85rem; margin-top: 0.5rem; text-align: center; font-weight: 600; }
    .error-msg { color: #e74c3c; font-size: 0.85rem; margin-top: 0.5rem; text-align: center; font-weight: 600; }

    .orders-btn { padding: 0.5rem 1rem; background: #9b59b6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; text-decoration: none; }
    .orders-btn:hover { background: #8e44ad; }
  `]
})
export class ProductsComponent implements OnInit {
  products: ProductUI[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getActiveProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.loading = false;
      }
    });
  }

  getLowestPrice(variants: any[]): number {
    if (!variants || variants.length === 0) return 0;
    return Math.min(...variants.map((v: any) => v.preco));
  }

  /**
   * Adiciona a primeira variante disponível do produto ao carrinho.
   * O estado de feedback (sucesso/erro) é aplicado APENAS ao produto clicado.
   */
  addToCart(product: ProductUI): void {
    if (!product.variantes || product.variantes.length === 0) {
      product.uiErrorMessage = 'Produto sem variantes disponíveis.';
      setTimeout(() => product.uiErrorMessage = '', 4000);
      return;
    }

    product.isAdding = true;
    product.uiSuccessMessage = '';
    product.uiErrorMessage = '';

    const primeiraVariante = product.variantes[0];
    const request: AddToCartRequest = {
      varianteId: primeiraVariante.id,
      quantidade: 1
    };

    this.cartService.addToCart(request).subscribe({
      next: () => {
        product.isAdding = false;
        product.uiSuccessMessage = `✅ "${product.nome}" adicionado!`;
        setTimeout(() => product.uiSuccessMessage = '', 3000);
      },
      error: (err) => {
        product.isAdding = false;
        if (err.status === 400) {
          product.uiErrorMessage = '❌ Estoque insuficiente.';
        } else {
          product.uiErrorMessage = '❌ Erro ao adicionar.';
        }
        setTimeout(() => product.uiErrorMessage = '', 4000);
        console.error('Erro ao adicionar ao carrinho:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}