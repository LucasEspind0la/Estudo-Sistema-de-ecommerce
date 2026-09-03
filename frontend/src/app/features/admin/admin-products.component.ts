import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductService, Product } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  template: `
    <div class="admin-container">
      <header class="header">
        <h1>Gerenciamento de Produtos</h1>
        <div class="header-actions">
          <button class="primary-btn" routerLink="/admin/produtos/novo">+ Novo Produto</button>
          <button class="secondary-btn" routerLink="/produtos">Ver Loja</button>
          <button class="logout-btn" (click)="logout()">Sair</button>
        </div>
      </header>

      <div *ngIf="loading" class="loading">Carregando...</div>

      <div *ngIf="!loading && products.length > 0" class="table-container">
        <table class="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço Mín.</th>
              <th>Estoque</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products">
              <td>{{ product.id }}</td>
              <td>{{ product.nome }}</td>
              <td>{{ product.categoriaNome || '-' }}</td>
              <td>{{ getLowestPrice(product.variantes) | currency:'BRL':'symbol':'1.2-2' }}</td>
              <td>{{ getTotalStock(product.variantes) }}</td>
              <td>
                <span class="badge" [class.active]="product.ativo" [class.inactive]="!product.ativo">
                  {{ product.ativo ? 'Ativo' : 'Inativo' }}
                </span>
              </td>
              <td class="actions">
                <button class="btn-toggle" (click)="toggleActive(product)" title="Alternar Status">
                  {{ product.ativo ? 'Desativar' : 'Ativar' }}
                </button>
                <button class="btn-edit" routerLink="/admin/produtos/editar/{{ product.id }}">Editar</button>
                <button class="btn-delete" (click)="deleteProduct(product.id)">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div *ngIf="!loading && products.length === 0" class="empty">Nenhum produto cadastrado.</div>
    </div>
  `,
  styles: [`
    .admin-container { padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
    .header h1 { color: #2c3e50; margin: 0; }
    .header-actions { display: flex; gap: 1rem; }
    .primary-btn { padding: 0.5rem 1rem; background: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; text-decoration: none; }
    .secondary-btn { padding: 0.5rem 1rem; background: #ecf0f1; color: #2c3e50; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; text-decoration: none; }
    .logout-btn { padding: 0.5rem 1rem; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .table-container { background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow-x: auto; }
    .products-table { width: 100%; border-collapse: collapse; }
    .products-table th, .products-table td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
    .products-table th { background: #f8f9fa; color: #2c3e50; font-weight: 600; }
    .badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
    .badge.active { background: #d4edda; color: #155724; }
    .badge.inactive { background: #f8d7da; color: #721c24; }
    .actions { display: flex; gap: 0.5rem; }
    .btn-toggle { padding: 0.4rem 0.8rem; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
    .btn-edit { padding: 0.4rem 0.8rem; background: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
    .btn-delete { padding: 0.4rem 0.8rem; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
    .loading, .empty { text-align: center; padding: 3rem; color: #7f8c8d; font-size: 1.1rem; }
  `]
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => { this.products = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  getLowestPrice(variants: any[]): number {
    if (!variants?.length) return 0;
    return Math.min(...variants.map((v: any) => v.preco));
  }

  getTotalStock(variants: any[]): number {
    if (!variants) return 0;
    return variants.reduce((sum: number, v: any) => sum + v.estoque, 0);
  }

  toggleActive(product: Product): void {
    if (confirm(`Deseja ${product.ativo ? 'desativar' : 'ativar'} este produto?`)) {
      this.productService.toggleActive(product.id).subscribe({
        next: () => {
          product.ativo = !product.ativo;
        },
        error: (err) => console.error('Erro ao alternar status:', err)
      });
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Erro ao excluir:', err);
          alert('Não foi possível excluir. O produto pode estar vinculado a um pedido.');
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
