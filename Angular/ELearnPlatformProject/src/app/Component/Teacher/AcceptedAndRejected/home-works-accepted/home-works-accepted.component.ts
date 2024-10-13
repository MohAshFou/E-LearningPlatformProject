import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TeacherService } from '../../../../Services/Teacher/teacher.service';
import { ALLStudentAcceptAndRejectDTO } from '../../../../Models/Teacher/allstudent-accept-and-reject-dto';

@Component({
  selector: 'app-home-works-accepted',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-works-accepted.component.html',
  styleUrl: './home-works-accepted.component.css'

})
export class HomeWorksAcceptedComponent  implements OnInit {
 allcount:ALLStudentAcceptAndRejectDTO[]=[]
  constructor(private teacherservice:TeacherService , private rou:Router){}
  ngOnInit(): void {


    this.teacherservice.CountsAllStudentAccpetAndRejectOnLesson().subscribe({
      next: (data: any) => {
        this.allcount= data;

        console.log(this.allcount)
      },
      error: (e: any) => {
        console.error(e); // Consider logging the error for debugging
      },
    });








  }
  gotodetails(idlesson:number){

  console.log(idlesson)
      this.teacherservice.setid(idlesson) ;

    this.rou.navigate(['/teacher/Details'])



 }

}
