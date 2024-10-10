import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelationsService {

  Lessons : any;
  StudentInfo : any;
  currentLesson:any

  setLesson( ParamOne :any){
    this.Lessons=ParamOne;
    // console.log(this.Lessons);
  }

  setStudentInfo(ParamTwo :any){
    this.StudentInfo=ParamTwo;
    // console.log(this.StudentInfo);
  }


  setcurrentLesson( e:any){

    this.currentLesson= e

  }
  getcurrentLesson( ){

    return  this.currentLesson

  }

  GetStudentInfo()
  {
    return this.StudentInfo
  }

  constructor() { }
}
