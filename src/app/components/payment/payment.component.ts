import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/Dtos/carDetailDto';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  carDetail: CarDetailDto;
  rentalForm: Rental
  paymentForm: FormGroup
  differenceInDay: number

  constructor(
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private activetedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.createPaymentForm()
        this.getCarDetailById(params["carId"])
        this.rentalService.currentStageRental.subscribe(response => this.rentalForm = response)
        if (!this.rentalForm.rentDate) {
          this.router.navigateByUrl("/cars/rental/" + params["carId"])
        }
      }
    })
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      name: ["", Validators.required],
      cardNumber: ["", Validators.required],
      expityMonth: ["", Validators.required],
      expityYear: ["", Validators.required],
      cvCode: ["", Validators.required]
    })
  }

  getCarDetailById(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe(response => {
      this.carDetail = response.data
    })
  }

  finalPayment() {
    let date1 = new Date(this.rentalForm.rentDate)
    let date2 = new Date(this.rentalForm.returnDate)
    this.differenceInDay = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)
    return this.differenceInDay * this.carDetail?.dailyPrice
  }

  finish() {
    if (this.paymentForm.valid) {
      this.toastrService.success("Ödemeniz Gerçekleştirildi.")
    } else {
      Object.entries(this.paymentForm.controls).forEach(element => {
        if (element[1].status === "INVALID") {
          this.toastrService.warning(element[0] + " boş olmamalı")
        }
      });
    }
    console.log(this.rentalForm)
  }
}
