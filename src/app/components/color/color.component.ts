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
  addColorForm: FormGroup
  colors: Color[] = [];
  currentColor: Color;
  filterText: "";
  dataLoaded = false;

  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    public authService: AuthService

  ) { }

  ngOnInit(): void {
    this.getColors()
    this.createColorForm()
    this.createAddColorForm()

  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
    this.createColorForm()
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

  createAddColorForm() {
    this.addColorForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    })
  }

  add() {
    if (this.addColorForm.valid) {
      let addColorModel = Object.assign({}, this.addColorForm.value)
      this.colorService.add(addColorModel).subscribe(response => {
        this.toastrService.success(response.message)
        this.getColors()
      })
    } else {
      Object.entries(this.addColorForm.controls).forEach(element => {
        if (element[1].status === "INVALID") {
          this.toastrService.warning(element[0] + " boş olmamalı")
        }
      });
    }
  }

  update() {
    if (this.colorForm.valid) {
      let brandModel = Object.assign({}, this.colorForm.value)
      this.colorService.update(brandModel).subscribe(response => {
        this.toastrService.success(response.message)
        this.getColors()
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
        this.getColors()
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

