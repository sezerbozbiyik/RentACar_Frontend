import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetail: CarDetail;
  carImage: CarImage;
  currentCar:Car;
  constructor(private carService: CarService,private sanitizer: DomSanitizer, private activetadRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activetadRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetailByCarId(params["carId"])
        this.getCarImageById(params["carId"])
        this.getCarsById(params["carId"])
      }
    })
  }
  getCarDetailByCarId(carId: number) {
    this.carService.getCarsDetailByCarId(carId).subscribe((response) => {
      this.carDetail = response.data[0];
    })
  }

  getCarImageById(carId: number) {
    this.carService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImage=response.data[0];
      console.log(this.carImage.imagePath);
    })
  }

  getCarsById(carId:number){
    this.carService.getCarsById(carId).subscribe((response) => {
      this.currentCar=response.data;
    })
  }

  getImgContent(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.carImage.imagePath);
}
}
