import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { AuthService } from 'src/app/services/auth.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colorForm: FormGroup
  colors: Color[] = [];
  currentColor: Color;
  filterText: "";
  dataLoaded = false;

  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    public authService:AuthService

  ) { }

  ngOnInit(): void {
    this.createColorForm()
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
      this.dataLoaded = true
    })
  }

  createColorForm() {
    this.colorForm = this.formBuilder.group({
      id: [this.currentColor?.id, Validators.required],
      colorName: [this.currentColor ? this.currentColor.colorName : "", Validators.required]
    })
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  update() {
    if (this.colorForm.valid) {
      let brandModel = Object.assign({}, this.colorForm.value)
      this.colorService.update(brandModel).subscribe(response => {
        this.toastrService.success(response.message)
      })
    } else {
      Object.entries(this.colorForm.controls).forEach(element => {
        if (element[1].status === "INVALID") {
          this.toastrService.warning(element[0] + " boş olmamalı")
        }
      });
    }
  }

  delete() {
    if (this.colorForm.valid) {
      let brandModel = Object.assign({}, this.colorForm.value)
      this.colorService.delete(brandModel).subscribe(response => {
        this.toastrService.success(response.message)
      })
    } else {
      Object.entries(this.colorForm.controls).forEach(element => {
        if (element[1].status === "INVALID") {
          this.toastrService.warning(element[0] + " boş olmamalı")
        }
      });
    }
  }

}

