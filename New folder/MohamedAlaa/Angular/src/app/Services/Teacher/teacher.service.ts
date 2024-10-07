import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  Controller ='Teacher/'
  DB_URL = "https://localhost:7217/api/Teacher/GetStudentsLessonDetails"
  constructor(private  Clinent:HttpClient) { }

  GetStudentsWithSubmittedHomeworks()
  {
    return this.Clinent.get(this.DB_URL);
  }
} 
