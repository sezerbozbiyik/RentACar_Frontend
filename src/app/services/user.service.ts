import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserDetailDto } from '../models/Dtos/userDetailDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44344/api/users/getbymailuserdto?email=";

  constructor(private httpClient: HttpClient) { }

  getUserByMail(mail: string): Observable<SingleResponseModel<UserDetailDto>> {
    return this.httpClient.get<SingleResponseModel<UserDetailDto>>(this.apiUrl + mail)
  }

}
