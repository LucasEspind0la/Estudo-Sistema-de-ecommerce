import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CategoryService, Category } from '../../core/services/category.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="admin-container">
      <header class="header">
        <h1>Gerenciamento de Categorias</h1>
        <div class="header-actions">
          <button class="primary-btn" routerLink="/admin/categorias/nova">+ Nova Categoria</button>
          <button class="secondary-btn" routerLink="/admin/produtos">Ver Produtos</button>
          <button class="logout-btn" (click)="logout()">Sair</button>
        </div>
      </header>

      <div *ngIf="loading" class="loading">Carregando categorias...</div>

      <div *ngIf="!loading && categories.length > 0" class="table-container">
        <table class="categories-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Criada em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let category of categories">
              <td>{{ category.id }}</td>
              <td>{{ category.nome }}</td>
              <td>{{ category.descricao || '-' }}</td>
              <td>{{ category.criadoEm | date:'dd/MM/yyyy HH:mm' }}</td>
              <td class="actions">
                <button class="btn-edit" routerLink="/admin/categorias/editar/{{ category.id }}">Editar</button>
                <button class="btn-delete" (click)="deleteCategory(category.id)">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div *ngIf="!loading && categories.length === 0" class="empty">
        <p>Nenhuma categoria cadastrada.</p>
        <button class="primary-btn" routerLink="/admin/categorias/nova">Criar Primeira Categoria</button>
      </div>
    </div>
  `,
  styles: [`
    .admin-container { padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
    .header h1 { color: #2c3e50; margin: 0; }
    .header-actions { display: flex; gap: 1rem; }
    .primary-btn { padding: 0.5rem 1rem; background: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; text-decoration: none; }
    .primary-btn:hover { background: #219150; }
    .secondary-btn { padding: 0.5rem 1rem; background: #ecf0f1; color: #2c3e50; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; text-decoration: none; }
    .secondary-btn:hover { background: #bdc3c7; }
    .logout-btn { padding: 0.5rem 1rem; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .table-container { background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow-x: auto; }
    .categories-table { width: 100%; border-collapse: collapse; }
    .categories-table th, .categories-table td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
    .categories-table th { background: #f8f9fa; color: #2c3e50; font-weight: 600; }
    .actions { display: flex; gap: 0.5rem; }
    .btn-edit { padding: 0.4rem 0.8rem; background: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
    .btn-edit:hover { background: #e67e22; }
    .btn-delete { padding: 0.4rem 0.8rem; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
    .btn-delete:hover { background: #c0392b; }
    .loading, .empty { text-align: center; padding: 3rem; color: #7f8c8d; font-size: 1.1rem; }
    .empty p { margin-bottom: 1.5rem; }
  `]
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];
  loading = true;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar categorias:', err);
        this.loading = false;
      }
    });
  }

  deleteCategory(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta categoria? Produtos vinculados podem ser afetados.')) {
      this.categoryService.delete(id).subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c.id !== id);
        },
        error: (err) => {
          console.error('Erro ao excluir categoria:', err);
          alert('Não foi possível excluir. A categoria pode estar vinculada a produtos.');
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}