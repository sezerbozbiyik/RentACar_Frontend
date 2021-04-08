import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';
import { ProfilComponent } from './components/profil/profil.component';


const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'cars', component: CarComponent },
  { path: 'cars/filter/brand/:brandId', component: CarComponent },
  { path: 'cars/filter/color/:colorId', component: CarComponent },
  { path: "cars/filter/:brandId/:colorId", component: CarComponent },
  { path: 'cars/detail/:carId', component: CarDetailComponent },

  { path: "brands", component: BrandComponent },

  { path: "colors", component: ColorComponent },

  { path: 'cars/rental/payment/:carId', component: PaymentComponent, canActivate: [LoginGuard] },
  { path: 'cars/rental/:carId', component: RentalComponent, canActivate: [LoginGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profil', component: ProfilComponent,canActivate:[LoginGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
