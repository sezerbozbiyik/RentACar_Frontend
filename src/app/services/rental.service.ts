import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44344/api/rentals/";
  constructor(private httpClient: HttpClient) { }

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newUrl =this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Rental>>(newUrl)
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    let newUrl = this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newUrl,rental)
  }
}
