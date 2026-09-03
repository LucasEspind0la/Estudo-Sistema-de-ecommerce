import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { ProductService, Product } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="form-container">
      <header class="header">
        <h1>{{ isEditMode ? 'Editar Produto' : 'Cadastrar Novo Produto' }}</h1>
        <button class="secondary-btn" routerLink="/admin/produtos">Voltar</button>
      </header>

      <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="product-form" *ngIf="!loadingData">
        <div class="form-row">
          <div class="form-group">
            <label>Nome do Produto *</label>
            <input type="text" formControlName="nome" placeholder="Ex: Tênis Nike">
            <div *ngIf="productForm.get('nome')?.invalid && productForm.get('nome')?.touched" class="error-msg">Obrigatório.</div>
          </div>
          <div class="form-group">
            <label>ID da Categoria *</label>
            <input type="number" formControlName="categoriaId" placeholder="Ex: 1">
          </div>
        </div>

        <div class="form-group">
          <label>Descrição *</label>
          <textarea formControlName="descricao" rows="3"></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Status</label>
            <select formControlName="ativo">
              <option [ngValue]="true">Ativo</option>
              <option [ngValue]="false">Inativo</option>
            </select>
          </div>
          <div class="form-group">
            <label>Destaque</label>
            <select formControlName="destaque">
              <option [ngValue]="true">Sim</option>
              <option [ngValue]="false">Não</option>
            </select>
          </div>
        </div>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 1.5rem 0;">
        <h3 style="color: #2c3e50; margin-bottom: 1rem;">Dados da Variação Principal</h3>

        <div class="form-row">
          <div class="form-group">
            <label>Preço (R$) *</label>
            <input type="number" step="0.01" formControlName="preco" placeholder="49.90">
          </div>
          <div class="form-group">
            <label>Estoque *</label>
            <input type="number" formControlName="estoque" placeholder="0">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Cor</label>
            <input type="text" formControlName="cor" placeholder="Ex: Preto">
          </div>
          <div class="form-group">
            <label>Tamanho</label>
            <input type="text" formControlName="tamanho" placeholder="Ex: 42">
          </div>
        </div>

        <div class="form-group file-group">
          <label>Imagem {{ isEditMode ? '(Deixe em branco para manter a atual)' : '(Opcional)' }}</label>
          <input type="file" (change)="onFileSelected($event)" accept="image/png, image/jpeg">
        </div>

        <div *ngIf="errorMessage" class="alert error">{{ errorMessage }}</div>

        <div class="form-actions">
          <button type="button" class="secondary-btn" routerLink="/admin/produtos" [disabled]="isSubmitting">Cancelar</button>
          <button type="submit" class="primary-btn" [disabled]="productForm.invalid || isSubmitting">
            {{ isSubmitting ? 'Processando...' : (isEditMode ? 'Atualizar Produto' : 'Salvar Produto') }}
          </button>
        </div>
      </form>
      <div *ngIf="loadingData" class="loading">Carregando dados...</div>
    </div>
  `,
  styles: [`
    .form-container { padding: 2rem; max-width: 800px; margin: 0 auto; font-family: 'Segoe UI', sans-serif; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
    .header h1 { color: #2c3e50; margin: 0; font-size: 1.5rem; }
    .secondary-btn { padding: 0.5rem 1rem; background: #ecf0f1; color: #2c3e50; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .product-form { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .form-group { margin-bottom: 1.5rem; }
    label { display: block; margin-bottom: 0.5rem; color: #2c3e50; font-weight: 600; font-size: 0.9rem; }
    input, textarea, select { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; box-sizing: border-box; }
    input:focus, textarea:focus, select:focus { outline: none; border-color: #3498db; }
    .error-msg { color: #e74c3c; font-size: 0.8rem; margin-top: 0.25rem; }
    .file-group input { padding: 0.5rem; background: #f8f9fa; }
    .form-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
    .primary-btn { padding: 0.75rem 2rem; background: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 1rem; }
    .primary-btn:hover:not(:disabled) { background: #219150; }
    .primary-btn:disabled { background: #95a5a6; cursor: not-allowed; }
    .alert { padding: 1rem; border-radius: 6px; margin-bottom: 1rem; text-align: center; font-weight: 600; }
    .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    .loading { text-align: center; padding: 3rem; color: #7f8c8d; font-size: 1.1rem; }
  `]
})
export class AdminProductFormComponent implements OnInit {
  productForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  selectedFile: File | null = null;
  
  isEditMode = false;
  productId: number | null = null;
  loadingData = false;
  originalProduct: Product | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', Validators.required],
      categoriaId: ['', [Validators.required, Validators.min(1)]],
      ativo: [true, Validators.required],
      destaque: [false, Validators.required],
      preco: ['', [Validators.required, Validators.min(0.01)]],
      estoque: ['', [Validators.required, Validators.min(0)]],
      cor: [''],
      tamanho: ['']
    });
  }

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.productId = +idParam;
      this.loadProductData(this.productId);
    }
  }

  loadProductData(id: number): void {
    this.loadingData = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.originalProduct = product;
        const v = product.variantes?.[0];
        this.productForm.patchValue({
          nome: product.nome,
          descricao: product.descricao,
          categoriaId: product.categoriaId,
          ativo: product.ativo,
          destaque: product.destaque,
          preco: v?.preco || '',
          estoque: v?.estoque || '',
          cor: v?.cor || '',
          tamanho: v?.tamanho || ''
        });
        this.loadingData = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar dados.';
        this.loadingData = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.selectedFile = input.files[0];
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    if (this.isEditMode && this.productId !== null && this.originalProduct !== null) {
      const pid = this.productId; // Garante que é number para o TypeScript
      
      const prodPayload = {
        nome: this.productForm.get('nome')?.value,
        descricao: this.productForm.get('descricao')?.value,
        categoriaId: parseInt(this.productForm.get('categoriaId')?.value, 10),
        ativo: this.productForm.get('ativo')?.value,
        destaque: this.productForm.get('destaque')?.value
      };

      this.productService.updateProduct(pid, prodPayload).pipe(
        switchMap(() => {
          const varianteId = this.originalProduct!.variantes[0].id;
          const varPayload = {
            cor: this.productForm.get('cor')?.value || this.originalProduct!.variantes[0].cor,
            tamanho: this.productForm.get('tamanho')?.value || this.originalProduct!.variantes[0].tamanho,
            sku: this.originalProduct!.variantes[0].sku,
            preco: parseFloat(this.productForm.get('preco')?.value),
            estoque: parseInt(this.productForm.get('estoque')?.value, 10)
          };
          return this.productService.updateVariant(pid, varianteId, varPayload);
        }),
        switchMap(() => {
          if (this.selectedFile) {
            return this.productService.uploadImage(pid, this.selectedFile);
          }
          return of(null);
        })
      ).subscribe({
        next: () => this.finishSuccess('Produto atualizado com sucesso!'),
        error: (err) => this.handleError(err)
      });

    } else {
      const payload = {
        nome: this.productForm.get('nome')?.value,
        descricao: this.productForm.get('descricao')?.value,
        categoriaId: parseInt(this.productForm.get('categoriaId')?.value, 10),
        ativo: this.productForm.get('ativo')?.value,
        destaque: this.productForm.get('destaque')?.value,
        variantes: [{
          cor: this.productForm.get('cor')?.value || 'Padrão',
          tamanho: this.productForm.get('tamanho')?.value || 'Único',
          sku: 'SKU-' + Date.now(),
          preco: parseFloat(this.productForm.get('preco')?.value),
          estoque: parseInt(this.productForm.get('estoque')?.value, 10)
        }]
      };

      this.productService.createProductWithImage(payload, this.selectedFile || undefined).subscribe({
        next: () => this.finishSuccess('Produto cadastrado com sucesso!'),
        error: (err) => this.handleError(err)
      });
    }
  }

  private finishSuccess(msg: string) {
    this.isSubmitting = false;
    alert(msg);
    this.router.navigate(['/admin/produtos']);
  }

  private handleError(err: any) {
    this.isSubmitting = false;
    this.errorMessage = err.error?.mensagem || err.error?.erro || 'Erro ao salvar. Verifique os dados.';
    console.error('Erro:', err);
  }
}