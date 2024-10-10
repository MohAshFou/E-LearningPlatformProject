import { Injectable } from '@angular/core';
import { StudentsWithSubmittedHomeworks } from '../../Models/Teacher/students-with-submitted-homeworks';

@Injectable({
  providedIn: 'root'
})
export class SumHomeService {

  private studentsWithHomeworks!:StudentsWithSubmittedHomeworks

  SetAlldetails(data: any): void {
    this.studentsWithHomeworks = data;
    console.log(this.studentsWithHomeworks);
  }

  GetAlldetails(): any {
    return this.studentsWithHomeworks;
  }

   constructor() { }

  
}
