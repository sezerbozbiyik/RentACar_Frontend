import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44344/api/colors/";
  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath)
  }

  add(colorModel:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newPath,colorModel)
  }

  update(colorModel:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"update"
    return this.httpClient.post<ResponseModel>(newPath,colorModel)
  }

  delete(colorModel:Color):Observable<ResponseModel>{
    let newPath=this.apiUrl+"delete"
    return this.httpClient.post<ResponseModel>(newPath,colorModel)
  }
}



