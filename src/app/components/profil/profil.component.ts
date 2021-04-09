import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserDetailDto } from 'src/app/models/Dtos/userDetailDto';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  profil: FormGroup
  user: UserDetailDto
  formAlert: string = "Uyarı yeri"

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private location: Location,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    let mail = localStorage.getItem("email")
    if (mail != null) {
      this.userService.getUserByMail(mail).subscribe(response => {
        this.user = response.data
      })
    }
  }

  save() {
    this.toastrService.success("Profiliniz Güncellendi")
  }

  goBack() {
    this.location.back()
  }

  logout() {
    this.authService.logout();
    window.location.reload()
  }
}
