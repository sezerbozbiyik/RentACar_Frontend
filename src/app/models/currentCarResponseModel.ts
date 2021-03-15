import { Car } from "./car";
import { ResponseModel } from "./responseModel";

export interface CurrentCarResponseModel extends ResponseModel{
    data:Car;
}