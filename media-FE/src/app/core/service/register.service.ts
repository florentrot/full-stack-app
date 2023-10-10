import { Injectable } from '@angular/core';
import {Endpoints} from "../../data/endpoints";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registerUrl = `${Endpoints.auth}`

  constructor() { }


}
