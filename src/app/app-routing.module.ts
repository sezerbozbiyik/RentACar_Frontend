import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandDetailComponent } from './components/brand/brand-detail/brand-detail.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { ColorDetailComponent } from './components/color/color-detail/color-detail.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'cars', component: CarComponent },
  { path: 'cars/filter/brand/:brandId', component: CarComponent },
  { path: 'cars/filter/color/:colorId', component: CarComponent },
  { path: "cars/filter/:brandId/:colorId", component: CarComponent },
  { path: 'cars/detail/:carId', component: CarDetailComponent },

  { path: "brands", component: BrandComponent },
  { path: "brands/:brandId", component: BrandDetailComponent, canActivate: [LoginGuard] },


  { path: "colors", component: ColorComponent },
  { path: "colors/:colorId", component: ColorDetailComponent, canActivate: [LoginGuard] },


  { path: 'cars/detail/rental/:carId', component: RentalComponent },

  { path: 'cars/detail/rental/payment', component: PaymentComponent, canActivate: [LoginGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
