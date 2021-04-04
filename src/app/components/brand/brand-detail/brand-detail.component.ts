import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit { 

  constructor(
    ) { }

  brandModal: string

  ngOnInit(): void {
    
  }


}
