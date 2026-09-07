import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService, CartResponse, CartItem } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';

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

      <div *ngIf="successMessage" class="alert success">{{ successMessage }}</div>
      <div *ngIf="errorMessage" class="alert error">{{ errorMessage }}</div>

      <div *ngIf="loading" class="loading">Carregando carrinho...</div>

      <div *ngIf="!loading && cart && cart.itens.length > 0" class="cart-content">
        <div class="cart-items">
          <div *ngFor="let item of cart.itens" class="cart-item">
            <div class="item-info">
              <h3>{{ item.nomeProduto }}</h3>
              <p class="variant">{{ item.cor }} - Tam: {{ item.tamanho }}</p>
              <p class="unit-price">Preço unitário: {{ item.precoUnitario | currency:'BRL':'symbol':'1.2-2' }}</p>
            </div>

            <div class="item-controls">
              <div class="quantity-control">
                <button class="qty-btn" (click)="updateQuantity(item, item.quantidade - 1)" [disabled]="item.quantidade <= 1">-</button>
                <span class="qty-value">{{ item.quantidade }}</span>
                <button class="qty-btn" (click)="updateQuantity(item, item.quantidade + 1)">+</button>
              </div>
              
              <button class="remove-btn" (click)="removeItem(item)">Remover</button>
            </div>

            <div class="item-subtotal">
              <span class="subtotal-label">Subtotal</span>
              <span class="subtotal-value">{{ item.subtotal | currency:'BRL':'symbol':'1.2-2' }}</span>
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
            <span>{{ cart.valorTotal | currency:'BRL':'symbol':'1.2-2' }}</span>
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
    .cart-items { flex: 2; min-width: 300px; display: flex; flex-direction: column; gap: 1rem; }
    .cart-item { display: flex; justify-content: space-between; align-items: center; background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); gap: 1rem; }
    .item-info { flex: 2; }
    .item-info h3 { margin: 0 0 0.25rem 0; color: #2c3e50; font-size: 1.1rem; }
    .variant { color: #7f8c8d; font-size: 0.9rem; margin: 0 0 0.25rem 0; }
    .unit-price { color: #2c3e50; font-size: 0.85rem; margin: 0; font-weight: 500; }
    .item-controls { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
    .quantity-control { display: flex; align-items: center; gap: 0.5rem; background: #f8f9fa; padding: 0.25rem; border-radius: 6px; }
    .qty-btn { width: 32px; height: 32px; background: white; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 1.1rem; color: #2c3e50; display: flex; align-items: center; justify-content: center; }
    .qty-btn:hover:not(:disabled) { background: #3498db; color: white; border-color: #3498db; }
    .qty-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .qty-value { min-width: 30px; text-align: center; font-weight: 600; font-size: 1rem; }
    .remove-btn { padding: 0.4rem 0.8rem; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem; font-weight: 600; transition: background 0.2s; }
    .remove-btn:hover { background: #c0392b; }
    .item-subtotal { flex: 1; text-align: right; min-width: 100px; }
    .subtotal-label { display: block; color: #7f8c8d; font-size: 0.8rem; margin-bottom: 0.25rem; }
    .subtotal-value { color: #27ae60; font-weight: 700; font-size: 1.1rem; }
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

  getTotalItems(): number {
    if (!this.cart) return 0;
    return this.cart.itens.reduce((sum, item) => sum + item.quantidade, 0);
  }

  /**
   * Atualiza a quantidade de um item no carrinho.
   * Após o sucesso, recarrega o carrinho do zero para garantir sincronia total.
   */
  updateQuantity(item: CartItem, novaQuantidade: number): void {
    if (novaQuantidade < 1) return;
    
    this.cartService.updateItemQuantity(item.id, novaQuantidade).subscribe({
      next: () => {
        this.loadCart(); // A mágica: busca o estado fresco do backend
      },
      error: (err) => {
        console.error('Erro ao atualizar quantidade:', err);
        this.errorMessage = 'Erro ao atualizar. Verifique o estoque.';
        setTimeout(() => this.errorMessage = '', 3000);
        this.loadCart();
      }
    });
  }

  /**
   * Remove um item do carrinho.
   * Após o sucesso, recarrega o carrinho do zero.
   */
    removeItem(item: CartItem): void {
    console.log('🔴 Tentando remover item ID:', item.id);
    
    if (!confirm(`Deseja remover "${item.nomeProduto}" do carrinho?`)) return;

    console.log('✅ Confirmação OK. Enviando DELETE para /api/carrinho/itens/' + item.id);

    this.cartService.removeItem(item.id).subscribe({
      next: (response) => {
        console.log('🟢 DELETE sucesso! Response:', response);
        console.log('🔄 Chamando loadCart()...');
        this.loadCart();
      },
      error: (err) => {
        console.error('🔴 ERRO no DELETE:', err);
        this.errorMessage = 'Erro ao remover item.';
        setTimeout(() => this.errorMessage = '', 3000);
        this.loadCart();
      }
    });
  }

  checkout(): void {
    this.isCheckingOut = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.orderService.checkout().subscribe({
      next: () => {
        this.isCheckingOut = false;
        this.successMessage = '🎉 Pedido realizado com sucesso! Obrigado pela compra.';
        this.loadCart(); // Recarrega para mostrar o carrinho vazio
      },
      error: (err) => {
        this.isCheckingOut = false;
        if (err.status === 400) {
          this.errorMessage = '❌ Erro ao finalizar: estoque insuficiente ou carrinho inválido.';
        } else {
          this.errorMessage = '❌ Ocorreu um erro ao processar seu pedido.';
        }
        console.error('Erro no checkout:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}