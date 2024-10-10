import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  Controller ='Student/'
  DB_URL = "https://localhost:7217/api/Student/GetStudentInfo"

  constructor(private readonly  Clinent:HttpClient) { }
  GetInfoAboutStudentCard()
  {
    return this.Clinent.get(this.DB_URL);
  }




  
}
