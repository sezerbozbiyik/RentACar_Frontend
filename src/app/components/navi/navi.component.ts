import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  user: User

  constructor(
    public authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    console.log(localStorage.getItem("email"))
    let mail = localStorage.getItem("email")
    if (mail != null) {
      this.userService.getByMail(mail).subscribe(response => {
        this.user = response.data
      })
    }
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
  }
}
