import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../Services/Teacher/teacher.service';
import { StudentsWithSubmittedHomeworks } from '../../../Models/Teacher/students-with-submitted-homeworks';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SumHomeService } from '../../../Services/Teacher/sum-home.service';

@Component({
  selector: 'app-homework',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css'],
})
export class HomeworkComponent implements OnInit {
  allStudents: StudentsWithSubmittedHomeworks[] = [];

  constructor(
    private teacherService: TeacherService,
    private sumser: SumHomeService,
    private rou: Router
  ) {}

  ngOnInit(): void {
    this.teacherService.GetAllStudentsWithSubmittedHomeworks().subscribe({
      next: (data: any) => {
        this.allStudents = data;
        this.sumser.SetAlldetails(data);
       
      },
      error: (e: any) => {
        console.error(e); // Consider logging the error for debugging
      },
    });
  }

  onclick(data: StudentsWithSubmittedHomeworks): void {
    this.sumser.SetAlldetails(data);
    this.rou.navigate([`/teacher/homework/${data.studentId}`]);
  }

  trackByStudentId(index: number, student: StudentsWithSubmittedHomeworks): number {
    return student.studentId;
  }
}
