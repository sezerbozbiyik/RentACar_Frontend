import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/Dtos/carDetailDto';
import { UserDetailDto } from 'src/app/models/Dtos/userDetailDto';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  carDetail: CarDetailDto
  receiptModal:string
  statusBar:string="75";
  statusStyle:string="width: "+this.statusBar+"%;"
  rentalForm: Rental
  currentTime:string
  user:UserDetailDto
  paymentForm: FormGroup

  constructor(
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private carService: CarService,
    private activetedRoute: ActivatedRoute,
    private userService:UserService,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getUser()
        this.createPaymentForm()
        this.getCarDetailById(params["carId"])
        this.rentalService.currentStageRental.subscribe(response => this.rentalForm = response)
        if (this.rentalForm.carId==null) {
          this.location.back()
        }
      }
    })
  }

  getUser() {
    let mail = localStorage.getItem("email")
    if (mail != null) {
      this.userService.getUserByMail(mail).subscribe(response => {
        this.user = response.data
      })
    }
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
    let differenceInDay = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)
    return differenceInDay * this.carDetail?.dailyPrice
  }

  finish() {
    let currentDate= new Date()
    this.currentTime=currentDate.getDate()+"/"+currentDate.getMonth()+"/"+currentDate.getFullYear()+" "+currentDate.getHours()+":"+currentDate.getMinutes()
    if (this.paymentForm.valid) {
      this.statusBar="100"
      this.statusStyle="width: "+this.statusBar+"%;"
      this.toastrService.success("Ödemeniz Gerçekleştirildi.")
      this.receiptModal="receiptModal"
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
