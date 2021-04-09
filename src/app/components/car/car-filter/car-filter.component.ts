import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  constructor(
    public router:Router
    
    ) { }

  @Input() colors: Color[]
  @Input() brands: Brand[]
  brandFilter:number
  colorFilter:number

  ngOnInit(): void {
  }
  routerCars(){
    if (this.brandFilter && this.colorFilter) {
      this.router.navigateByUrl("cars/filter/"+this.brandFilter+"/"+this.colorFilter)
    }
    else if (this.brandFilter && !this.colorFilter){
      this.router.navigateByUrl("cars/filter/brand/"+this.brandFilter)
    }
    else if (!this.brandFilter && this.colorFilter){
      this.router.navigateByUrl("cars/filter/color/"+this.colorFilter)
    }
  }
}
