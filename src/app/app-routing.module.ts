import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductComponent } from './product/product.component';
import { ReviewComponent } from './review/review.component';
import { SearchComponent } from './search/search.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CategorySearchComponent } from './category-search/category-search.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account', component: AccountComponent},
  {path: 'cart', component: CartComponent},
  {path: 'order-confirmation/:orderId', component: OrderConfirmationComponent},
  {path: 'past-orders', component: PastOrdersComponent},
  {path: 'payment/:orderId', component: PaymentComponent},
  {path: 'product/:productId', component: ProductComponent},
  {path: 'review/:orderId', component: ReviewComponent},
  {path: 'c/:categoryId', component: CategorySearchComponent},
  {path: 'search', component: SearchComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: '', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
