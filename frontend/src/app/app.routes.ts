import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ProductsComponent } from './features/products/products.component';
import { CartComponent } from './features/cart/cart.component';
import { OrdersComponent } from './features/orders/orders.component';
import { AdminProductsComponent } from './features/admin/admin-products.component'; 
import { AdminProductFormComponent } from './features/admin/admin-product-form.component'; 


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'produtos', component: ProductsComponent },
  { path: 'carrinho', component: CartComponent },
  { path: 'pedidos', component: OrdersComponent },
  { path: 'admin/produtos', component: AdminProductsComponent }, 
  { path: 'admin/produtos/novo', component: AdminProductFormComponent },
  { path: '**', redirectTo: '/login' }
];