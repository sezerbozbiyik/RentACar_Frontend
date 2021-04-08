import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { CarDetailDto } from 'src/app/models/Dtos/carDetailDto';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';
import { UserDetailDto } from 'src/app/models/Dtos/userDetailDto';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  user: UserDetailDto
  rentalAddForm: FormGroup
  carDetail: CarDetailDto

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private activetedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private router: Router,
    private userService: UserService,

  ) { }

  ngOnInit(): void {

    this.activetedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getUser()
        this.getCarDetailById(params["carId"])
        this.createRentalAddFrom(params["carId"])
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

  createRentalAddFrom(carId: string) {
    this.rentalAddForm = this.formBuilder.group({
      carId: parseInt(carId),
      rentDate: ["", Validators.required],
      returnDate: ["", Validators.required]
    })
  }

  getCarDetailById(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe(response => {
      this.carDetail = response.data;
    })
  }

  goToPayment() {
    if (this.rentalAddForm.valid) {
      this.rentalService.updateRental(this.rentalAddForm)
      let rentalModel = Object.assign({}, this.rentalAddForm.value)
      rentalModel.customerId = this.user.customerID
      this.rentalService.addRental(rentalModel).subscribe(response => {
        this.router.navigateByUrl("cars/rental/payment/" + this.rentalAddForm.controls.carId.value)
        this.toastrService.info("Ödeme Bilgilerinizi Giriniz...")
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
      Object.entries(this.rentalAddForm.controls).forEach(element => {
        if (element[1].status === "INVALID") {
          this.toastrService.warning(element[0] + " boş olmamalı")
        }
      });
    }
  }
}
