import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';

export interface ProductVariantCreateRequest {
  cor: string;
  tamanho: string;
  preco: number;
  estoque: number;
}

export interface CreateProductRequest {
  nome: string;
  descricao: string;
  categoriaId: number;
  variantes: ProductVariantCreateRequest[];
}

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
  categoria?: { id: number; nome: string };
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

  createProductWithImage(payload: CreateProductRequest, file?: File): Observable<Product> {
    return this.http.post<Product>('/api/produtos', payload).pipe(
      switchMap((createdProduct) => {
        if (!file) {
          return of(createdProduct);
        }
        const formData = new FormData();
        formData.append('imagem', file, file.name);
        
        // Concatenação simples para evitar erros de sintaxe no terminal
        const url = '/api/produtos/' + createdProduct.id + '/imagem';
        
        return this.http.put<Product>(url, formData).pipe(
          switchMap(() => of(createdProduct))
        );
      })
    );
  }
}
