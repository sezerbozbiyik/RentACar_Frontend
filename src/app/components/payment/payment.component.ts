import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input() childCarDetail: CarDetail;
  @Input() childRentalForm: FormGroup;

  paymentForm:FormGroup
  totalPayment:number
  differenceInDay:number

  constructor(
    private rentalService:RentalService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder
    ) { }

  ngOnInit(): void {
    this.createPaymentForm()
  }

  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      name:["",Validators.required],
      cardNumber:["",Validators.required],
      expityMonth: ["",Validators.required],
      expityYear:["",Validators.required],
      cvCode:["",Validators.required]
    })
  }


  add() {
    if (this.paymentForm.valid) {
      if (this.childRentalForm.valid) {
      let rentalModel = Object.assign({}, this.childRentalForm.value)
      this.rentalService.addRental(rentalModel).subscribe((response) => {
        this.toastrService.success(response.message, "Ödeme Gerçekleştiriliyor...")
      }, responseError => {
        if (responseError.error.ValidationErrors && responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
          }
        }
        this.toastrService.error(responseError.error.message, "Hata")
      })
    } else {
      this.toastrService.error("Formunuz eksik", "Dikkat")
    }
    }else{
      this.toastrService.error("Kredi Kart Bilgileri Hatalı", "Dikkat")
    }
    
  }

  
  finalPayment(){
    let rentalModel= Object.assign({},this.childRentalForm.value)
    let date1=new Date(rentalModel.rentDate)
    let date2 = new Date(rentalModel.returnDate)
    this.differenceInDay = (date2.getTime()-date1.getTime())/ (1000 * 3600 * 24)
    
    return this.totalPayment=(this.differenceInDay*this.childCarDetail.dailyPrice)
  }
}
