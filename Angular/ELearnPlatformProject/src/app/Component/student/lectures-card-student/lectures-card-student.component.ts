import { Component , Input, Output } from '@angular/core';

@Component({
  selector: 'app-lectures-card-student',
  standalone: true,
  imports: [],
  templateUrl: './lectures-card-student.component.html',
  styleUrl: './lectures-card-student.component.css'
})
export class LecturesCardStudentComponent {
  @Input() lecture: any;

}
