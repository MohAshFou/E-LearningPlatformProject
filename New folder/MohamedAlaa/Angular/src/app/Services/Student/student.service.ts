import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  Controller ='Student/'
  constructor(private  Clinent:HttpClient) { }




  
}