import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetailDto } from 'src/app/models/Dtos/carDetailDto';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { Car } from 'src/app/models/car';
import { ToastrService } from 'ngx-toastr';
import { CarImage } from 'src/app/models/carImage';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: CarDetailDto[]
  currentCar: CarDetailDto
  addCarForm: FormGroup
  brands: Brand[];
  colors: Color[];
  filterText: "";
  brandFilter: string
  colorFilter: string
  dataLoaded = false;
  isLogin: boolean

  constructor(
    private carService: CarService,
    private sanitizer: DomSanitizer,
    private activetedRoute: ActivatedRoute,
    private authService: AuthService,
    private colorService: ColorService,
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLogin = this.authService.isAuthenticated()
    this.activetedRoute.params.subscribe(params => {
      if (params["colorId"] && params["brandId"]) {
        this.getCarsByColorAndBrand(params["colorId"], params["brandId"])
      } else if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"]);
      }
      else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"]);
      } else {
        this.getCars();
      }
    })
    this.getBrands()
    this.getColors()
    this.createAddCarForm()

  }

  createAddCarForm() {
    this.addCarForm = this.formBuilder.group({
      carName: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      carDescription: ["", Validators.required]
    })
  }

  setCurrentCar(car: CarDetailDto) {
    this.currentCar = car
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
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

  add() {
    if (this.addCarForm.valid) {
      let carModel: Car = Object.assign({}, this.addCarForm.value)
      carModel.brandId = parseInt(this.brandFilter)
      carModel.colorId = parseInt(this.colorFilter)
      this.carService.add(carModel).subscribe(response => {
        this.toastrService.success(response.message)
        this.getCars()
      }, responseError => {
        if (responseError.error.ValidationErrors && responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
          }
        } else {
          this.toastrService.error(responseError.error.message, "Hata")
        }
      })
    } else {
      Object.entries(this.addCarForm.controls).forEach(element => {
        if (element[1].status === "INVALID") {
          this.toastrService.warning(element[0] + " boş olmamalı")
        }
      });
    }
  }

  delete() {

  }

  getImgContent(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl("http://localhost:8887/default.png" )
  }
}
