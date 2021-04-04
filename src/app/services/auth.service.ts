import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtModel } from '../models/jwtModel';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44344/api/auth";

  constructor(private httpClient: HttpClient) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<JwtModel>> {
    let newPath = this.apiUrl + "/login";
    return this.httpClient.post<SingleResponseModel<JwtModel>>(newPath,loginModel)
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<JwtModel>> {
    let newPath = this.apiUrl + "/register";
    return this.httpClient.post<SingleResponseModel<JwtModel>>(newPath,registerModel)
  }

  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true
    }else{
      return false
    }
  }
}
