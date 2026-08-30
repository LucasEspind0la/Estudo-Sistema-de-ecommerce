import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // ESPIÃO: Vamos ver o que o interceptor está pensando
  console.log('🔍 Interceptor disparado para:', req.url);
  console.log('🔑 Token existe no LocalStorage?', !!token);

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('✅ Token adicionado ao cabeçalho da requisição!');
    return next(clonedReq);
  }

  console.log('❌ NENHUM TOKEN ENCONTRADO. A requisição vai sem autenticação (causando 401).');
  return next(req);
};