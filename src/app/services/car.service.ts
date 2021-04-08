import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarDetailDto } from '../models/Dtos/carDetailDto';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44344/api/";
  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "cars/getbycarsdetail";
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }

  add(carModel:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newPath,carModel)
  }
  
  update(carModel:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/update";
    return this.httpClient.post<ResponseModel>(newPath,carModel)
  }

  delete(carModel:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/delete";
    return this.httpClient.post<ResponseModel>(newPath,carModel)
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "cars/getcarsdetailbybrandid?id=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "cars/getcarsdetailbycolorid?id=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }
  getCarDetailByCarId(carId: number): Observable<SingleResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "cars/getcarsdetailbycarid?id=" + carId;
    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(newPath)
  }

  getCarImagesByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "carimages/getimagesbycarid?id=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }
  getCarsByColorAndBrand(colorId: number, brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "cars/getcarsdetailbycolorandbrandid?colorId=" + colorId + "&brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }
}
