import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RelationsService } from '../../../../Services/Student/relations.service';
import { Lesson } from '../../../../Models/Student/lesson';

@Component({
  selector: 'app-watch-vedio',
  standalone: true,
  imports: [],
  templateUrl: './watch-vedio.component.html',
  styleUrl: './watch-vedio.component.css'
})


export class WatchVedioComponent implements OnInit {

  curentlesson:any
  lesson:Lesson={
    accessPeriod:"",
    description:"",
    feeAmount:"",
    gradeLevel:"" ,
    hasVideoAccess :"",
    homeworkURL  :"",
    lessonId: 0 ,
    pdfurl: "",
    title :"" ,
    uploadDate:"",
    videoURL:""

  }
  constructor(private Location:Location , private re:RelationsService){


  }
  ngOnInit(): void {
 this.curentlesson= this.re.getcurrentLesson()
    console.log(this.curentlesson)
  }



  Back()
  {
    this.Location.back();
  }
}
