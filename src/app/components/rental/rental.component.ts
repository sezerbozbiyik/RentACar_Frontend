import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { CarDetail } from 'src/app/models/carDetail';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentalAddForm: FormGroup
  carDetail: CarDetail
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private activetedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.createRentalAddFrom(params["carId"])
        this.getCarDetailById(params["carId"])
      }
    })
  }
  
  // carId: number doesn't work!
  createRentalAddFrom(carId: string) {
    this.rentalAddForm = this.formBuilder.group({
      carId: parseInt(carId),
      customerId: ["", Validators.required],
      rentDate: ["", Validators.required],
      returnDate: ["", Validators.required]
    })

  }

  getCarDetailById(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe(response => {
      this.carDetail = response.data;
    })
  }

}
