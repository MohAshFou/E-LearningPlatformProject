import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { UserAuthService } from '../../../Services/User/user-auth.service';
import { TeacherService } from '../../../Services/Teacher/teacher.service';
import { CommonModule } from '@angular/common';
import { CountOfVideoLevels } from '../../../Models/Teacher/count-of-video-levels';

@Component({
  selector: 'app-stu-info',
  standalone: true,
  imports: [ RouterLink,CommonModule,RouterModule],
  templateUrl: './stu-info.component.html',
  styleUrl: './stu-info.component.css'
})
export class StuInfoComponent  implements OnInit{


  Name:string="Mohamed"
  CountOfVideoLevels: CountOfVideoLevels;
  StudenntHomeWork : any;
  constructor(
    private service:UserAuthService ,
    public MyServ:TeacherService){
      this.CountOfVideoLevels = {
        level1: '',
        level2: '',
        level3: ''
      };

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

   ///
   this.MyServ.GetStudentsWithSubmittedHomeworks().subscribe({
    next:(data)=> {
      this.StudenntHomeWork=data;
    },
    error:(err)=> {
      console.log("Error is");
    },
   });


  //jjjjjjjjjjjjjjjjjjjjjjjjjj

  this.MyServ.GetNumberOfVideosByLevel().subscribe({
    next:(data)=> {
      this.CountOfVideoLevels.level1=data.f;
      this.CountOfVideoLevels.level2=data.s;
      this.CountOfVideoLevels.level3=data.t;
    },
    error:(err)=> {
      console.log("Error is");
    },
   });
  }
}
