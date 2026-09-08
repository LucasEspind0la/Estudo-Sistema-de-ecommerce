import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrderService, Order } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterLink],
  template: `
    <div class="admin-container">
      <header class="header">
        <h1>Gestão de Pedidos</h1>
        <div class="header-actions">
          <button class="secondary-btn" routerLink="/admin/dashboard">📊 Dashboard</button>
          <button class="logout-btn" (click)="logout()">Sair</button>
        </div>
      </header>

      <div *ngIf="loading" class="loading">Carregando pedidos...</div>

      <div *ngIf="!loading && orders.length > 0" class="table-container">
        <table class="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Cliente</th>
              <th>Status Atual</th>
              <th>Valor Total</th>
              <th>Alterar Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of orders">
              <td>#{{ order.id }}</td>
              <td>{{ order.criadoEm | date:'dd/MM/yyyy HH:mm' }}</td>
              <td>{{ order.emailUsuario }}</td>
              <td>
                <span class="status-badge" [ngClass]="'status-' + order.status.toLowerCase()">
                  {{ order.status }}
                </span>
              </td>
              <td class="text-right">{{ order.valorTotal | currency:'BRL':'symbol':'1.2-2' }}</td>
              <td>
                <select 
                  class="status-select" 
                  [value]="order.status" 
                  (change)="updateStatus(order, $event)">
                  <option value="PENDENTE">Pendente</option>
                  <option value="PAGO">Pago</option>
                  <option value="ENVIADO">Enviado</option>
                  <option value="ENTREGUE">Entregue</option>
                  <option value="CANCELADO">Cancelado</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="!loading && orders.length === 0" class="empty">
        <p>Nenhum pedido encontrado no sistema.</p>
      </div>
    </div>
  `,
  styles: [`
    .admin-container { padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
    .header h1 { color: #2c3e50; margin: 0; }
    .header-actions { display: flex; gap: 1rem; }
    .secondary-btn { padding: 0.5rem 1rem; background: #ecf0f1; color: #2c3e50; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; text-decoration: none; }
    .secondary-btn:hover { background: #bdc3c7; }
    .logout-btn { padding: 0.5rem 1rem; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .table-container { background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow-x: auto; }
    .orders-table { width: 100%; border-collapse: collapse; }
    .orders-table th, .orders-table td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
    .orders-table th { background: #f8f9fa; color: #2c3e50; font-weight: 600; }
    .text-right { text-align: right; font-weight: 600; }
    .status-badge { padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
    .status-pendente { background: #fff3cd; color: #856404; }
    .status-pago { background: #cce5ff; color: #004085; }
    .status-enviado { background: #e2d9f3; color: #5a3d8a; }
    .status-entregue { background: #d4edda; color: #155724; }
    .status-cancelado { background: #f8d7da; color: #721c24; }
    .status-select { padding: 0.4rem; border: 1px solid #ddd; border-radius: 4px; font-size: 0.85rem; cursor: pointer; background: white; }
    .status-select:focus { outline: none; border-color: #3498db; }
    .loading, .empty { text-align: center; padding: 3rem; color: #7f8c8d; font-size: 1.1rem; }
  `]
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data: Order[]) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar pedidos:', err);
        this.loading = false;
      }
    });
  }

  updateStatus(order: Order, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;
    
    if (newStatus === order.status) return;

    this.orderService.updateOrderStatus(order.id, newStatus).subscribe({
      next: (updatedOrder: Order) => {
        order.status = updatedOrder.status;
      },
      error: (err: any) => {
        console.error('Erro ao atualizar status:', err);
        alert('Erro ao atualizar o status do pedido.');
        this.loadOrders();
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
