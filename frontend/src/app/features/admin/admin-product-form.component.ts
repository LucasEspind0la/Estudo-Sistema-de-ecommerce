import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService, CreateProductRequest } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';

/**
 * Componente administrativo para cadastro de novos produtos.
 * Delega a lógica complexa de requisições encadeadas para o ProductService.
 */
@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="form-container">
      <header class="header">
        <h1>Cadastrar Novo Produto</h1>
        <button class="secondary-btn" routerLink="/admin/produtos">Voltar para Lista</button>
      </header>

      <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="product-form">
        <div class="form-row">
          <div class="form-group">
            <label for="nome">Nome do Produto *</label>
            <input type="text" id="nome" formControlName="nome" placeholder="Ex: Tênis Nike Air Max">
            <div *ngIf="productForm.get('nome')?.invalid && productForm.get('nome')?.touched" class="error-msg">
              Nome é obrigatório (mín. 3 caracteres).
            </div>
          </div>

          <div class="form-group">
            <label for="categoriaId">ID da Categoria *</label>
            <input type="number" id="categoriaId" formControlName="categoriaId" placeholder="Ex: 1">
            <div *ngIf="productForm.get('categoriaId')?.invalid && productForm.get('categoriaId')?.touched" class="error-msg">
              Categoria é obrigatória.
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="descricao">Descrição *</label>
          <textarea id="descricao" formControlName="descricao" rows="3" placeholder="Descreva o produto..."></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="preco">Preço (R$) *</label>
            <input type="number" step="0.01" id="preco" formControlName="preco" placeholder="49.90">
            <div *ngIf="productForm.get('preco')?.invalid && productForm.get('preco')?.touched" class="error-msg">
              Preço deve ser maior que zero.
            </div>
          </div>

          <div class="form-group">
            <label for="estoque">Estoque Inicial *</label>
            <input type="number" id="estoque" formControlName="estoque" placeholder="0">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="cor">Cor</label>
            <input type="text" id="cor" formControlName="cor" placeholder="Ex: Preto">
          </div>

          <div class="form-group">
            <label for="tamanho">Tamanho</label>
            <input type="text" id="tamanho" formControlName="tamanho" placeholder="Ex: 42">
          </div>
        </div>

        <div class="form-group file-group">
          <label for="imagem">Imagem do Produto (Opcional)</label>
          <input type="file" id="imagem" (change)="onFileSelected($event)" accept="image/png, image/jpeg">
          <p class="file-hint">Formatos aceitos: JPG, PNG. Máx: 2MB.</p>
        </div>

        <div *ngIf="errorMessage" class="alert error">{{ errorMessage }}</div>

        <div class="form-actions">
          <button type="button" class="secondary-btn" routerLink="/admin/produtos" [disabled]="isSubmitting">Cancelar</button>
          <button type="submit" class="primary-btn" [disabled]="productForm.invalid || isSubmitting">
            {{ isSubmitting ? 'Processando...' : 'Salvar Produto' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container { padding: 2rem; max-width: 800px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
    .header h1 { color: #2c3e50; margin: 0; font-size: 1.5rem; }
    .secondary-btn { padding: 0.5rem 1rem; background: #ecf0f1; color: #2c3e50; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; text-decoration: none; }
    .secondary-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .product-form { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .form-group { margin-bottom: 1.5rem; }
    label { display: block; margin-bottom: 0.5rem; color: #2c3e50; font-weight: 600; font-size: 0.9rem; }
    input, textarea { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; box-sizing: border-box; transition: border-color 0.2s; }
    input:focus, textarea:focus { outline: none; border-color: #3498db; }
    .error-msg { color: #e74c3c; font-size: 0.8rem; margin-top: 0.25rem; }
    .file-group input { padding: 0.5rem; background: #f8f9fa; }
    .file-hint { color: #7f8c8d; font-size: 0.8rem; margin-top: 0.25rem; }
    .form-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
    .primary-btn { padding: 0.75rem 2rem; background: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 1rem; }
    .primary-btn:hover:not(:disabled) { background: #219150; }
    .primary-btn:disabled { background: #95a5a6; cursor: not-allowed; }
    .alert { padding: 1rem; border-radius: 6px; margin-bottom: 1rem; text-align: center; font-weight: 600; }
    .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
  `]
})
export class AdminProductFormComponent implements OnInit {
  productForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', Validators.required],
      categoriaId: ['', [Validators.required, Validators.min(1)]],
      preco: ['', [Validators.required, Validators.min(0.01)]],
      estoque: ['', [Validators.required, Validators.min(0)]],
      cor: [''],
      tamanho: ['']
    });
  }

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/login']);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    // 🎯 PAYLOAD ATUALIZADO: Agora bate 100% com as validações @NotNull e @NotBlank do Backend Java
    const payload = {
      nome: this.productForm.get('nome')?.value,
      descricao: this.productForm.get('descricao')?.value,
      categoriaId: parseInt(this.productForm.get('categoriaId')?.value, 10),
      ativo: true,              // <-- ADICIONADO (obrigatório no backend)
      destaque: false,          // <-- ADICIONADO (obrigatório no backend)
      variantes: [
        {
          cor: this.productForm.get('cor')?.value || 'Padrão',
          tamanho: this.productForm.get('tamanho')?.value || 'Único',
          sku: 'SKU-' + Date.now(), // <-- ADICIONADO (obrigatório @NotBlank no backend)
          preco: parseFloat(this.productForm.get('preco')?.value),
          estoque: parseInt(this.productForm.get('estoque')?.value, 10)
        }
      ]
    };

    // Delega a lógica complexa (JSON + Upload) para o serviço
    this.productService.createProductWithImage(payload, this.selectedFile || undefined).subscribe({
      next: () => {
        this.isSubmitting = false;
        alert('Produto cadastrado com sucesso!');
        this.router.navigate(['/admin/produtos']);
      },
      error: (err) => {
        this.isSubmitting = false;
        // Extrai a mensagem de erro amigável do backend, se existir
        const msg = err.error?.mensagem || err.error?.erro || 'Erro ao salvar produto. Verifique os dados e tente novamente.';
        this.errorMessage = msg;
        console.error('Erro detalhado no cadastro:', err);
      }
    });
  }
}