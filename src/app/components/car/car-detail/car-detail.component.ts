import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
  carImages: CarImage;
  constructor(
    private carService: CarService,
    private sanitizer: DomSanitizer,
    private activetadRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.activetadRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetailByCarId(params["carId"])
        this.getCarImageById(params["carId"])
      }
    })
  }
  getCarDetailByCarId(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe((response) => {
      this.carDetail = response.data;
    })
  }

  getCarImageById(carId: number) {
    this.carService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data[0];
    })
  }

  getImgContent(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl("http://localhost:8887/" + this.carImages.imagePath.slice(73))
    
  }
}
