import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrderService, Order } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';

/**
 * Componente responsável por exibir o histórico de pedidos do usuário.
 */
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterLink],
  template: `
    <div class="orders-container">
      <header class="header">
        <h1>Meus Pedidos</h1>
        <div class="header-actions">
          <button class="secondary-btn" routerLink="/produtos">Continuar Comprando</button>
          <button class="logout-btn" (click)="logout()">Sair</button>
        </div>
      </header>

      <div *ngIf="loading" class="loading">Carregando pedidos...</div>

      <div *ngIf="!loading && orders.length === 0" class="empty">
        <p>Você ainda não realizou nenhum pedido.</p>
        <button class="secondary-btn" routerLink="/produtos">Ir para a Loja</button>
      </div>

      <div *ngIf="!loading && orders.length > 0" class="orders-list">
        <div *ngFor="let order of orders" class="order-card">
          <div class="order-header">
            <div class="order-info">
              <h3>Pedido #{{ order.id }}</h3>
              <p class="order-date">{{ order.dataCriacao | date:'dd/MM/yyyy HH:mm' }}</p>
            </div>
            <div class="order-status">
              <span class="status-badge" [ngClass]="getStatusClass(order.status)">
                {{ order.status }}
              </span>
            </div>
          </div>

          <div class="order-items">
            <div *ngFor="let item of order.itens" class="order-item">
              <div class="item-details">
                <strong>{{ item.produtoNome }}</strong>
                <span class="variant">{{ item.varianteDescricao }}</span>
              </div>
              <div class="item-pricing">
                <span>{{ item.quantidade }}x {{ item.precoUnitario | currency:'BRL':'symbol':'1.2-2' }}</span>
                <span class="subtotal">{{ item.subtotal | currency:'BRL':'symbol':'1.2-2' }}</span>
              </div>
            </div>
          </div>

          <div class="order-footer">
            <span class="total-label">Total:</span>
            <span class="total-value">{{ order.total | currency:'BRL':'symbol':'1.2-2' }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .orders-container { padding: 2rem; max-width: 1000px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
    .header h1 { color: #2c3e50; margin: 0; }
    .header-actions { display: flex; gap: 1rem; }
    .secondary-btn { padding: 0.5rem 1rem; background: #ecf0f1; color: #2c3e50; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; text-decoration: none; }
    .secondary-btn:hover { background: #bdc3c7; }
    .logout-btn { padding: 0.5rem 1rem; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .loading, .empty { text-align: center; padding: 3rem; color: #7f8c8d; font-size: 1.1rem; }
    .empty p { margin-bottom: 1.5rem; }
    .orders-list { display: flex; flex-direction: column; gap: 1.5rem; }
    .order-card { background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden; }
    .order-header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; background: #f8f9fa; border-bottom: 1px solid #eee; }
    .order-info h3 { margin: 0 0 0.25rem 0; color: #2c3e50; font-size: 1.2rem; }
    .order-date { margin: 0; color: #7f8c8d; font-size: 0.9rem; }
    .status-badge { padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; }
    .status-criado { background: #3498db; color: white; }
    .status-pago { background: #27ae60; color: white; }
    .status-enviado { background: #f39c12; color: white; }
    .status-entregue { background: #2c3e50; color: white; }
    .status-cancelado { background: #e74c3c; color: white; }
    .order-items { padding: 1.5rem; }
    .order-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid #f0f0f0; }
    .order-item:last-child { border-bottom: none; }
    .item-details { display: flex; flex-direction: column; }
    .item-details strong { color: #2c3e50; font-size: 1rem; margin-bottom: 0.25rem; }
    .variant { color: #7f8c8d; font-size: 0.85rem; }
    .item-pricing { display: flex; gap: 1.5rem; align-items: center; text-align: right; }
    .item-pricing span:first-child { color: #7f8c8d; font-size: 0.9rem; }
    .subtotal { color: #2c3e50; font-weight: 600; min-width: 100px; }
    .order-footer { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; background: #f8f9fa; border-top: 2px solid #eee; }
    .total-label { color: #7f8c8d; font-size: 1rem; }
    .total-value { color: #27ae60; font-size: 1.4rem; font-weight: 700; }
  `]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  /**
   * Busca a lista de pedidos do usuário logado.
   */
  loadOrders(): void {
    this.orderService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar pedidos:', err);
        this.loading = false;
      }
    });
  }

  /**
   * Retorna a classe CSS apropriada para o status do pedido.
   */
  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'CRIADO': 'status-criado',
      'PAGO': 'status-pago',
      'ENVIADO': 'status-enviado',
      'ENTREGUE': 'status-entregue',
      'CANCELADO': 'status-cancelado'
    };
    return statusMap[status] || 'status-criado';
  }

  /**
   * Encerra a sessão do usuário e redireciona para a tela de login.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
