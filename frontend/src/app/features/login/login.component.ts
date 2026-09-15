import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="header">
          <h1>🛒 Sualoja</h1>
          <p class="subtitle">{{ isRegisterMode ? 'Crie sua conta para começar a comprar' : 'Acesse sua conta para continuar' }}</p>
        </div>

        <!-- Botões de Alternância -->
        <div class="toggle-container">
          <button 
            class="toggle-btn" 
            [class.active]="!isRegisterMode" 
            (click)="toggleMode(false)">
            Entrar
          </button>
          <button 
            class="toggle-btn" 
            [class.active]="isRegisterMode" 
            (click)="toggleMode(true)">
            Criar Conta
          </button>
        </div>

        <form [formGroup]="authForm" (ngSubmit)="onSubmit()" class="auth-form">
          
          <!-- Campo Nome (Apenas no Cadastro) -->
          <div class="form-group" *ngIf="isRegisterMode">
            <label>Nome Completo</label>
            <input type="text" formControlName="nome" placeholder="Seu nome">
            <div *ngIf="authForm.get('nome')?.invalid && authForm.get('nome')?.touched" class="error-msg">Nome é obrigatório.</div>
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" formControlName="email" placeholder="seu@email.com">
            <div *ngIf="authForm.get('email')?.invalid && authForm.get('email')?.touched" class="error-msg">Email inválido.</div>
          </div>

          <div class="form-group">
            <label>Senha</label>
            <input type="password" formControlName="senha" placeholder="••••••••">
            <div *ngIf="authForm.get('senha')?.invalid && authForm.get('senha')?.touched" class="error-msg">Mínimo de 6 caracteres.</div>
          </div>

          <div *ngIf="errorMessage" class="alert error">{{ errorMessage }}</div>

          <button type="submit" class="submit-btn" [disabled]="authForm.invalid || isSubmitting">
            {{ isSubmitting ? 'Processando...' : (isRegisterMode ? 'Cadastrar' : 'Entrar') }}
          </button>
        </form>

        <div class="footer">
          <p *ngIf="!isRegisterMode">
            Ainda não tem conta? <a (click)="toggleMode(true)">Cadastre-se grátis</a>
          </p>
          <p *ngIf="isRegisterMode">
            Já tem uma conta? <a (click)="toggleMode(false)">Faça login</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); font-family: 'Segoe UI', sans-serif; padding: 1rem; }
    .login-card { background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); width: 100%; max-width: 420px; }
    .header { text-align: center; margin-bottom: 1.5rem; }
    .header h1 { margin: 0; color: #2c3e50; font-size: 2rem; }
    .subtitle { color: #7f8c8d; margin-top: 0.5rem; font-size: 0.95rem; }
    
    .toggle-container { display: flex; background: #f1f3f5; border-radius: 8px; padding: 4px; margin-bottom: 1.5rem; }
    .toggle-btn { flex: 1; padding: 0.6rem; border: none; background: transparent; border-radius: 6px; cursor: pointer; font-weight: 600; color: #7f8c8d; transition: all 0.2s; }
    .toggle-btn.active { background: white; color: #2c3e50; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    
    .auth-form { display: flex; flex-direction: column; gap: 1rem; }
    .form-group { display: flex; flex-direction: column; }
    label { font-size: 0.85rem; font-weight: 600; color: #2c3e50; margin-bottom: 0.4rem; }
    input { padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; transition: border-color 0.2s; }
    input:focus { outline: none; border-color: #3498db; }
    .error-msg { color: #e74c3c; font-size: 0.75rem; margin-top: 0.25rem; }
    
    .submit-btn { padding: 0.9rem; background: #27ae60; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: background 0.2s; margin-top: 0.5rem; }
    .submit-btn:hover:not(:disabled) { background: #219150; }
    .submit-btn:disabled { background: #95a5a6; cursor: not-allowed; }
    
    .footer { text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: #7f8c8d; }
    .footer a { color: #3498db; cursor: pointer; font-weight: 600; text-decoration: none; }
    .footer a:hover { text-decoration: underline; }
    
    .alert { padding: 0.8rem; border-radius: 8px; font-size: 0.85rem; text-align: center; font-weight: 600; }
    .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
  `]
})
export class LoginComponent {
  authForm: FormGroup;
  isRegisterMode = false;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      nome: [''],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleMode(isRegister: boolean): void {
    this.isRegisterMode = isRegister;
    this.errorMessage = '';
    this.authForm.reset();
    
    // Ajusta validações baseado no modo
    const nomeControl = this.authForm.get('nome');
    if (isRegister) {
      nomeControl?.setValidators([Validators.required, Validators.minLength(3)]);
    } else {
      nomeControl?.clearValidators();
    }
    nomeControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const { email, senha, nome } = this.authForm.value;

    const request$ = this.isRegisterMode
      ? this.authService.register({ nome, email, senha, papel: 'CLIENTE' })
      : this.authService.login({ email, senha });

    request$.subscribe({
      next: () => {
        this.isSubmitting = false;
        // Redireciona baseado no papel do usuário
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/produtos']);
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 401) {
          this.errorMessage = 'Email ou senha incorretos.';
        } else if (err.status === 400) {
          this.errorMessage = err.error?.mensagem || 'Dados inválidos. Verifique os campos.';
        } else {
          this.errorMessage = 'Erro ao conectar com o servidor.';
        }
        console.error('Erro de autenticação:', err);
      }
    });
  }
}
