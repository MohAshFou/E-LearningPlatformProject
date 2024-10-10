import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../Services/Teacher/teacher.service';
import { ReplyToQuestion } from '../../../Models/Teacher/reply-to-question';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  constructor( private teatherSer:TeacherService	){}
     allQuestions:any
    // TeacherReply:string=""
    unansweredQuestionsCount: number = 0;
  ngOnInit(): void {
    this.loadUnansweredQuestions();

    this.teatherSer.currentCount.subscribe(count => {
      this.unansweredQuestionsCount = count;
    });
  }

  loadUnansweredQuestions(): void {
    this.teatherSer.GetAllUnansweredQuestions().subscribe({
      next: (d) => {
        this.allQuestions = d.map((question: any) => ({ ...question, TeacherReply: '' }));
        this.unansweredQuestionsCount= d.length
        this.teatherSer.updateCount(this.unansweredQuestionsCount );
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }


  sendReply( i:number , r:string){
 let repl:ReplyToQuestion={
  commentId:i,
  teacherReply:r

 }
this.teatherSer.SendReplyMessege(repl).subscribe({
  next: (d) => {
    this.loadUnansweredQuestions();
    this.teatherSer.updateCount(this.unansweredQuestionsCount - 1);

  },
  error: (e: any) => {
    console.log(e)
  }
});


}




}
