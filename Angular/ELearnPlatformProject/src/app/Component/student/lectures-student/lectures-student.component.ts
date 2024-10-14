import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../../../Services/Student/student.service';
import { RelationsService } from '../../../Services/Student/relations.service';

@Component({
  selector: 'app-lectures-student',
  standalone: true,
  imports: [CommonModule ,RouterModule],
  templateUrl: './lectures-student.component.html',
  styleUrl: './lectures-student.component.css'
})
export class LecturesStudentComponent implements OnInit  {

  public successMessage: string | null = null;
  public ErrorMessage: string | null = null;

  id:number=0
  WatchVedio(e:any)
  {
    this.router.navigate(['student/WatchVedio'])

    this.Test.setcurrentLesson(e)

  }

  constructor (private myserv:StudentService , private Test :RelationsService ,private router: Router){}
  goToReceipt(Test:any) {
   this.Test.setcurrentLesson(Test)


    this.router.navigate(['student/receipt']);
  }
  CardDetails:any;
  Lesson:any;
  ngOnInit(): void {
    this.myserv.GetInfoAboutStudentCard().subscribe({
      next:(data :any)=>{
        console.log(data)
        this.Lesson=data.lessons;
        this.Test.setLesson(data.lessons)
        this.Test.setStudentInfo(data.studentInfo)


      },
      error:()=>{
        console.log("Eror");
      },
    })
  }

  addToWishList(item:any){
    this.id = this.Test.GetStudentInfo().id;


    console.log(this.id)
    console.log(item.lessonId)

    this.myserv.addtoWishlist(this.id,item.lessonid).subscribe({
      next:(data :any)=>{
        this.successMessage=`${item.title} has been successfully added to your wishlist`

        this.ErrorMessage= null
      },
      error:()=>{
        this.ErrorMessage= `${item.title} has already been added.`
          this.successMessage=null
      },
    })

  }
}
