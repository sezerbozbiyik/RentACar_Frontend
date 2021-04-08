import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetailDto } from 'src/app/models/Dtos/carDetailDto';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: CarDetailDto[];
  brands: Brand[];
  colors: Color[];
  filterText: "";
  brandFilter: number
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private activetedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params => {
      if (params["colorId"] && params["brandId"]) {
        this.getCarsByColorAndBrand(params["colorId"], params["brandId"])
      } else if (params["brandId"]) {
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
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
  getCarsByColorAndBrand(colorId: number, brandId: number) {
    this.carService.getCarsByColorAndBrand(colorId, brandId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
}
