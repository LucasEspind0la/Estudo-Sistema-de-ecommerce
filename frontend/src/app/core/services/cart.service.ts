import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AddToCartRequest {
  varianteId: number;
  quantidade: number;
}

export interface CartItem {
  id: number;
  produtoNome: string;
  varianteDescricao: string; // Ex: "Cor: Preta, Tamanho: M"
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

export interface CartResponse {
  itens: CartItem[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>('/api/carrinho');
  }

  addToCart(request: AddToCartRequest): Observable<any> {
    return this.http.post('/api/carrinho/adicionar', request);
  }
  
  // Métodos futuros: removeFromItem, clearCart, checkout
}
