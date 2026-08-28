import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductVariant {
  id: number;
  cor: string;
  tamanho: string;
  sku: string;
  preco: number;
  estoque: number;
}

export interface Product {
  id: number;
  nome: string;
  descricao: string;
  ativo: boolean;
  destaque: boolean;
  imagemUrl: string | null;
  variantes: ProductVariant[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/produtos/ativos');
  }
}
