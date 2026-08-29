import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService, CartResponse } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';

/**
 * Componente responsável por exibir o carrinho de compras e permitir a finalização da compra.
 */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  template: `
    <div class="cart-container">
      <header class="header">
        <h1>Meu Carrinho</h1>
        <div class="header-actions">
          <button class="secondary-btn" routerLink="/produtos">Continuar Comprando</button>
          <button class="logout-btn" (click)="logout()">Sair</button>
        </div>
      </header>

      <!-- Mensagens de Feedback -->
      <div *ngIf="successMessage" class="alert success">{{ successMessage }}</div>
      <div *ngIf="errorMessage" class="alert error">{{ errorMessage }}</div>

      <div *ngIf="loading" class="loading">Carregando carrinho...</div>

      <div *ngIf="!loading && cart && cart.itens.length > 0" class="cart-content">
        <div class="cart-items">
          <div *ngFor="let item of cart.itens" class="cart-item">
            <div class="item-info">
              <h3>{{ item.produtoNome }}</h3>
              <p class="variant">{{ item.varianteDescricao }}</p>
            </div>
            <div class="item-details">
              <span class="quantity">Qtd: {{ item.quantidade }}</span>
              <span class="price">{{ item.precoUnitario | currency:'BRL':'symbol':'1.2-2' }}</span>
              <span class="subtotal">{{ item.subtotal | currency:'BRL':'symbol':'1.2-2' }}</span>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <h2>Resumo do Pedido</h2>
          <div class="summary-row">
            <span>Total de itens:</span>
            <span>{{ getTotalItems() }}</span>
          </div>
          <div class="summary-row total">
            <span>Total a pagar:</span>
            <span>{{ cart.total | currency:'BRL':'symbol':'1.2-2' }}</span>
          </div>
          <button 
            class="checkout-btn" 
            (click)="checkout()"
            [disabled]="isCheckingOut"
          >
            {{ isCheckingOut ? 'Processando...' : 'Finalizar Compra' }}
          </button>
        </div>
      </div>

      <div *ngIf="!loading && (!cart || cart.itens.length === 0) && !successMessage" class="empty-cart">
        <p>Seu carrinho está vazio.</p>
        <button class="secondary-btn" routerLink="/produtos">Ir para a Loja</button>
      </div>
    </div>
  `,
  styles: [`
    .cart-container { padding: 2rem; max-width: 1000px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
    .header h1 { color: #2c3e50; margin: 0; }
    .header-actions { display: flex; gap: 1rem; }
    .secondary-btn { padding: 0.5rem 1rem; background: #ecf0f1; color: #2c3e50; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; text-decoration: none; }
    .secondary-btn:hover { background: #bdc3c7; }
    .logout-btn { padding: 0.5rem 1rem; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .cart-content { display: flex; gap: 2rem; flex-wrap: wrap; }
    .cart-items { flex: 2; min-width: 300px; }
    .cart-item { display: flex; justify-content: space-between; align-items: center; background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 1rem; }
    .item-info h3 { margin: 0 0 0.25rem 0; color: #2c3e50; font-size: 1.1rem; }
    .variant { color: #7f8c8d; font-size: 0.9rem; margin: 0; }
    .item-details { display: flex; gap: 1.5rem; align-items: center; text-align: right; }
    .quantity { color: #7f8c8d; font-weight: 500; }
    .price { color: #2c3e50; font-weight: 600; min-width: 80px; }
    .subtotal { color: #27ae60; font-weight: 700; font-size: 1.1rem; min-width: 100px; }
    .cart-summary { flex: 1; min-width: 250px; background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); height: fit-content; }
    .cart-summary h2 { margin-top: 0; color: #2c3e50; font-size: 1.2rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 0.75rem; color: #7f8c8d; }
    .summary-row.total { font-size: 1.2rem; font-weight: 700; color: #2c3e50; border-top: 2px solid #eee; padding-top: 0.75rem; margin-top: 0.75rem; }
    .checkout-btn { width: 100%; padding: 1rem; background: #27ae60; color: white; border: none; border-radius: 6px; font-size: 1rem; font-weight: 700; cursor: pointer; margin-top: 1rem; transition: background 0.2s; }
    .checkout-btn:hover:not(:disabled) { background: #219150; }
    .checkout-btn:disabled { background: #95a5a6; cursor: not-allowed; }
    .empty-cart { text-align: center; padding: 4rem 2rem; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
    .empty-cart p { font-size: 1.2rem; color: #7f8c8d; margin-bottom: 1.5rem; }
    .loading { text-align: center; padding: 3rem; color: #7f8c8d; font-size: 1.1rem; }
    .alert { padding: 1rem; border-radius: 6px; margin-bottom: 1rem; text-align: center; font-weight: 600; }
    .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
    .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
  `]
})
export class CartComponent implements OnInit {
  cart: CartResponse | null = null;
  loading = true;
  isCheckingOut = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  /**
   * Busca os dados atuais do carrinho do usuário logado no backend.
   */
  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cart = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar carrinho:', err);
        this.loading = false;
      }
    });
  }

  /**
   * Calcula a soma total de quantidades de todos os itens no carrinho.
   */
  getTotalItems(): number {
    if (!this.cart) return 0;
    return this.cart.itens.reduce((sum, item) => sum + item.quantidade, 0);
  }

  /**
   * Envia a requisição de finalização de compra para o backend.
   * Em caso de sucesso, exibe mensagem e recarrega o carrinho (que estará vazio).
   */
  checkout(): void {
    this.isCheckingOut = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.orderService.checkout().subscribe({
      next: () => {
        this.isCheckingOut = false;
        this.successMessage = '🎉 Pedido realizado com sucesso! Obrigado pela compra.';
        this.cart = null; // Limpa a visualização do carrinho
        // Opcional: redirecionar para uma página de "Meus Pedidos" no futuro
      },
      error: (err) => {
        this.isCheckingOut = false;
        if (err.status === 400) {
          this.errorMessage = '❌ Erro ao finalizar: estoque insuficiente ou carrinho inválido.';
        } else {
          this.errorMessage = '❌ Ocorreu um erro ao processar seu pedido. Tente novamente.';
        }
        console.error('Erro no checkout:', err);
      }
    });
  }

  /**
   * Encerra a sessão do usuário e redireciona para a tela de login.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}