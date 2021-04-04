import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44344/api/brands/";
  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath)
  }

  add(brandModel:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,brandModel)
  }

  update(brandModel:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"update"
    return this.httpClient.post<ResponseModel>(newPath,brandModel)
  }

  delete(brandModel:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl+"delete"
    return this.httpClient.post<ResponseModel>(newPath,brandModel)
  }

}
