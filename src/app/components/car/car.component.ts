import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  dataLoaded = false;

  constructor(private carSerive: CarService, private activetedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"]);
        
      }
      else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"]);
        
      }
      else {
        this.getCars();
      }
    })
  }

  getCars() {
    this.carSerive.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByBrand(brandId:number) {
    this.carSerive.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByColor(colorId:number) {
    this.carSerive.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
}
