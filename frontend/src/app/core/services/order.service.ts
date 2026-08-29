import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interface representando um item dentro de um pedido.
 */
export interface OrderItem {
  produtoNome: string;
  varianteDescricao: string;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

/**
 * Interface representando um pedido completo.
 */
export interface Order {
  id: number;
  dataCriacao: string;
  status: string;
  total: number;
  itens: OrderItem[];
}

/**
 * Serviço responsável por gerenciar as operações de pedidos.
 */
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  /**
   * Finaliza a compra, transformando os itens do carrinho em um pedido real.
   */
  checkout(): Observable<any> {
    return this.http.post('/api/pedidos/finalizar', {});
  }

  /**
   * Busca todos os pedidos do usuário logado.
   * @returns Observable com a lista de pedidos.
   */
  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/pedidos/meus-pedidos');
  }
}