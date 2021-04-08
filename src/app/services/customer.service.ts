import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44344/api/customers/getbyuserid?id=";

  constructor(private httpClient:HttpClient) { }

  getCustomerByUserId(userId:number):Observable<SingleResponseModel<Customer>>{
    return this.httpClient.get<SingleResponseModel<Customer>>(this.apiUrl+userId)
  }
}
