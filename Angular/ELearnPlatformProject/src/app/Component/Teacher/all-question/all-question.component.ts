import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TeacherService } from '../../../Services/Teacher/teacher.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-question',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './all-question.component.html',
  styleUrl: './all-question.component.css'
})
export class AllQuestionComponent {


  info: any[] = [];

  constructor(private myserv: TeacherService) {}

  ngOnInit(): void {
    this.uploadQuestion()
  }

  uploadQuestion(){

    this.myserv.AllQuestionAndReplyFromSelectedQuestion().subscribe({
      next: (data: any) => {
        this.info = data;
        console.log(this.info);
      },
      error: (err) => {
        console.error(err);
      }
    });

  }
  deleteQuestion(questionID:any){

    this.myserv.RemoveQuestion(questionID).subscribe({
      next: (data: any) => {
        this.uploadQuestion()
      },
      error: (err) => {
        console.error(err);
      }
    });

  }
}
