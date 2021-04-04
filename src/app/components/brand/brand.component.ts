import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  currentBrand: Brand
  brandForm: FormGroup
  brands: Brand[] = [];
  filterText: "";
  dataLoaded = false;

  constructor(
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    public authService:AuthService,
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.createBrandForm();
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand
    this.createBrandForm()
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      this.dataLoaded = true
    })
  }

  createBrandForm() {
    this.brandForm = this.formBuilder.group({
      id: [this.currentBrand?.id, Validators.required],
      brandName: [this.currentBrand ? this.currentBrand.brandName : "", Validators.required]
    })
  }

  update() {
    if (this.brandForm.valid) {
      let brandModel = Object.assign({}, this.brandForm.value)
      this.brandService.update(brandModel).subscribe(response => {
        this.toastrService.success(response.message)
      })
    } else {
      Object.entries(this.brandForm.controls).forEach(element => {
        if (element[1].status === "INVALID") {
          this.toastrService.warning(element[0] + " boş olmamalı")
        }
      });
    }
  }

  delete() {
    if (this.brandForm.valid) {
      let brandModel = Object.assign({}, this.brandForm.value)
      this.brandService.delete(brandModel).subscribe(response => {
        this.toastrService.success(response.message)
      })
    } else {
      Object.entries(this.brandForm.controls).forEach(element => {
        if (element[1].status === "INVALID") {
          this.toastrService.warning(element[0] + " boş olmamalı")
        }
      });
    }
  }
  
}
