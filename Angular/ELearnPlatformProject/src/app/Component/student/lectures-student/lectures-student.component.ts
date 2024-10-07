import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Router } from '@angular/router';
import { LecturesCardStudentComponent } from '../lectures-card-student/lectures-card-student.component';

@Component({
  selector: 'app-lectures-student',
  standalone: true,
  imports: [CommonModule ,LecturesCardStudentComponent],
  templateUrl: './lectures-student.component.html',
  styleUrl: './lectures-student.component.css'
})
export class LecturesStudentComponent {

  lectures = [
    {
      id: 1,
      title: 'Lecture 1',
      description: 'Chapter 1 first lecture',
      date: '25-09-2024',
      time: '3:00:00',
      price: '50 Pound',
      part: 13,
    },
    {
      id: 2,
      title: 'Lecture 2',
      description: 'Chapter 2 second lecture',
      date: '26-09-2024',
      time: '4:00:00',
      price: '60 Pound',
      part: 12,
    },
    {
    id: 3,
      title: 'Lecture 3',
      description: 'Chapter 3 first lecture',
      date: '25-09-2024',
      time: '3:00:00',
      price: '50 Pound',
      part: 13,
    },
    {
      id: 4,
      title: 'Lecture 4',
      description: 'Chapter 4 second lecture',
      date: '26-09-2024',
      time: '4:00:00',
      price: '60 Pound',
      part: 12,
    },

  ];


}
