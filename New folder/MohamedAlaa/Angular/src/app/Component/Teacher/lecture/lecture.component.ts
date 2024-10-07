
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LectureCardComponent } from '../lecture-card/lecture-card.component';
import { EditLectureComponent } from '../edit-lecture/edit-lecture.component';
import { Router } from '@angular/router';

@Component({
  selector: 'Lessons',
  standalone: true,
  imports: [CommonModule, LectureCardComponent, EditLectureComponent],
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css'],
})
export class LectureComponent {
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

  selectedLecture = null;

  onEditLecture(lecture: any) {
    this.selectedLecture = lecture;
  }

  onSaveLecture(updatedLecture: any) {
    this.lectures = this.lectures.map((lec) =>
      lec.id === updatedLecture.id ? updatedLecture : lec
    );
    this.selectedLecture = null;
  }

  onCloseModal() {
    this.selectedLecture = null;  
  }

  // constructor(private router: Router) {}  

  // goToLogin() {
  //   this.router.navigate(['/login']);  
  // }
  
}
