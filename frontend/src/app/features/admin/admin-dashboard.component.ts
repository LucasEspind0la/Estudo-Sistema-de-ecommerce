import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DashboardService, DashboardMetrics } from '../../core/services/dashboard.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterLink],
  template: `
    <div class="dashboard-container">
      <header class="header">
        <h1>Painel Administrativo</h1>
        <div class="header-actions">
          <button class="secondary-btn" routerLink="/admin/produtos">Gerenciar Produtos</button>
          <button class="secondary-btn" routerLink="/admin/categorias">Gerenciar Categorias</button>
          <button class="secondary-btn" routerLink="/admin/pedidos">📦 Gerenciar Pedidos</button>
          <button class="logout-btn" (click)="logout()">Sair</button>
        </div>
      </header>

      <div *ngIf="loading" class="loading">Carregando métricas...</div>

      <div *ngIf="!loading && metrics" class="content">
        <!-- Cards de Métricas -->
        <div class="cards-grid">
          <div class="metric-card revenue">
            <div class="icon">💰</div>
            <div class="info">
              <span class="label">Faturamento Total</span>
              <span class="value">{{ metrics.faturamentoTotal | currency:'BRL':'symbol':'1.2-2' }}</span>
            </div>
          </div>
          <div class="metric-card orders">
            <div class="icon">📦</div>
            <div class="info">
              <span class="label">Total de Pedidos</span>
              <span class="value">{{ metrics.totalPedidos }}</span>
            </div>
          </div>
          <div class="metric-card warning" [class.alert]="metrics.produtosEstoqueBaixo > 0">
            <div class="icon">⚠️</div>
            <div class="info">
              <span class="label">Estoque Baixo (< 5)</span>
              <span class="value">{{ metrics.produtosEstoqueBaixo }}</span>
            </div>
          </div>
        </div>

        <!-- Tabela de Últimos Pedidos -->
        <div class="recent-orders">
          <h2>Últimos 5 Pedidos</h2>
          <div *ngIf="metrics.ultimosPedidos.length === 0" class="empty">Nenhum pedido realizado ainda.</div>
          <table *ngIf="metrics.ultimosPedidos.length > 0" class="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Cliente</th>
                <th>Status</th>
                <th class="text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let order of metrics.ultimosPedidos">
                <td>#{{ order.id }}</td>
                <td>{{ order.criadoEm | date:'dd/MM/yyyy HH:mm' }}</td>
                <td>{{ order.emailUsuario }}</td>
                <td><span class="status-badge" [ngClass]="'status-' + order.status.toLowerCase()">{{ order.status }}</span></td>
                <td class="text-right">{{ order.valorTotal | currency:'BRL':'symbol':'1.2-2' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
    .header h1 { color: #2c3e50; margin: 0; }
    .header-actions { display: flex; gap: 1rem; }
    .secondary-btn { padding: 0.5rem 1rem; background: #ecf0f1; color: #2c3e50; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; text-decoration: none; }
    .secondary-btn:hover { background: #bdc3c7; }
    .logout-btn { padding: 0.5rem 1rem; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .content { display: flex; flex-direction: column; gap: 2rem; }
    .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .metric-card { display: flex; align-items: center; gap: 1.5rem; background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border-left: 5px solid #3498db; }
    .metric-card.revenue { border-left-color: #27ae60; }
    .metric-card.orders { border-left-color: #3498db; }
    .metric-card.warning { border-left-color: #f39c12; }
    .metric-card.warning.alert { border-left-color: #e74c3c; background: #fff5f5; }
    .icon { font-size: 2.5rem; }
    .info { display: flex; flex-direction: column; }
    .label { color: #7f8c8d; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { color: #2c3e50; font-size: 1.8rem; font-weight: 700; margin-top: 0.25rem; }
    .recent-orders { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .recent-orders h2 { margin-top: 0; color: #2c3e50; font-size: 1.3rem; margin-bottom: 1rem; }
    .orders-table { width: 100%; border-collapse: collapse; }
    .orders-table th { text-align: left; padding: 1rem; background: #f8f9fa; color: #2c3e50; font-weight: 600; border-bottom: 2px solid #eee; }
    .orders-table td { padding: 1rem; border-bottom: 1px solid #eee; color: #34495e; }
    .text-right { text-align: right; font-weight: 600; }
    .status-badge { padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
    .status-pendente { background: #fff3cd; color: #856404; }
    .status-pago { background: #cce5ff; color: #004085; }
    .status-enviado { background: #e2d9f3; color: #5a3d8a; }
    .status-entregue { background: #d4edda; color: #155724; }
    .status-cancelado { background: #f8d7da; color: #721c24; }
    .loading, .empty { text-align: center; padding: 3rem; color: #7f8c8d; font-size: 1.1rem; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  metrics: DashboardMetrics | null = null;
  loading = true;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    this.dashboardService.getMetrics().subscribe({
      next: (data) => {
        this.metrics = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar dashboard:', err);
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}