import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from 'src/app/components/brand/brand.component';
import { ColorComponent } from 'src/app/components/color/color.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';


const routes: Routes = [
  { path: 'brand-component', component: BrandComponent },
  { path: 'color-component', component: ColorComponent },
  { path: 'car-component', component: CarComponent },
  { path: 'rental-component', component: RentalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
