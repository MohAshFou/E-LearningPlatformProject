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
    TeacherReply:string=""
  ngOnInit(): void {

    this.teatherSer.GetAllUnansweredQuestions().subscribe({
      next: (d) => {

          this.allQuestions= d
          console.log(this.allQuestions)
      },
      error: (e: any) => {
        console.log(e)
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


      console.log(d)
  },
  error: (e: any) => {
    console.log(e)
  }
});


}




}
