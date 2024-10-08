import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { UploadLesson } from '../../Models/Teacher/upload-lesson';
import { ReplyToQuestion } from '../../Models/Teacher/reply-to-question';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  Controller ='Teacher/'

  constructor(private  Clinent:HttpClient) { }


  getLessonsByGradeLevel(gradeLevel: string): Observable<any> {
    return this.Clinent.get<any>(`${environment.baseUrl}${this.Controller}${gradeLevel}`);
  }
  GetStudentsWithSubmittedHomeworks()
  {
    return this.Clinent.get(`${environment.baseUrl}${this.Controller}GetStudentsLessonDetails`);
  }
  GetCountOfQuestionNotReplying ():Observable<any>
  {

    return this.Clinent.get<any>(`${environment.baseUrl}${this.Controller}QuestionAndCountOfNotReplyFromTeacher`);
  }


  GetNumberOfVideosByLevel ():Observable<any>
  {

    return this.Clinent.get<any>(`${environment.baseUrl}${this.Controller}GetNumberOfVideosByLevel`);
  }


   AddNewLesson( NewLesson:any):Observable<any>{
    return this.Clinent.post<any>(`${environment.baseUrl}${this.Controller}Uploadlesson` ,NewLesson);
   }



   GetAllUnansweredQuestions():Observable<any>{
    return this.Clinent.get<any>(`${environment.baseUrl}${this.Controller}unansweredByLesson` );
   }

   SendReplyMessege(rep:ReplyToQuestion):Observable<any>{
    return this.Clinent.post<any>(`${environment.baseUrl}${this.Controller}replyToQuestion`,rep );
   }





}
