import { Component, OnInit } from '@angular/core';
import { UserDetailDto } from 'src/app/models/Dtos/userDetailDto';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  user: UserDetailDto

  constructor(
    public authService: AuthService,
    private userService: UserService
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

  logout() {
    this.authService.logout()
    window.location.reload()
  }
}
