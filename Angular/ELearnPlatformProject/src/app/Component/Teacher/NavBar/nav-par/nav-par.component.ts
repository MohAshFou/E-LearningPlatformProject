import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserAuthService } from '../../../../Services/User/user-auth.service';
import { TeacherService } from '../../../../Services/Teacher/teacher.service';

@Component({
  selector: 'app-nav-par',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './nav-par.component.html',
  styleUrl: './nav-par.component.css'
})
export class NavParComponent implements OnInit {
  Name:any="Mohamed"
  QuestionNotReplying:any=''
  constructor(private service:UserAuthService , private teacherService:TeacherService){


  }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {

      this.service.getRoleAndName().subscribe({
        next: (d) => {
           this.Name= d.username
        },
        error: (e: any) => {

        }
      });


  }

    this.teacherService.GetCountOfQuestionNotReplying().subscribe({
      next: (ed) => {
         this.QuestionNotReplying= ed.count
      },
      error: (e: any) => {

      }
    });

   }



}
