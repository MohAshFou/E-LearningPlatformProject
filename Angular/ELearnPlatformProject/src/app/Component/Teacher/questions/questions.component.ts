import { Component } from '@angular/core';
import { TeacherService } from '../../../Services/Teacher/teacher.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {

  questions: any[] = []; // Initialize as an array
  selectedQuestions: any[] = []; // Array to store selected questions

  constructor(private myserv: TeacherService) {}

  ngOnInit(): void {
    this.myserv.GetAllQuestionsAndRepliesonForCommanQuestion	().subscribe({
      next: (data: any) => {
        this.questions = data;
        console.log(this.questions);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  sendSelectedQuestions(): void {
    this.selectedQuestions = this.questions
      .filter(question => question.selected)
      .map(question => ({
        gradeLevel: question.gradeLevel,
        lessonName: question.lessonTitle,
        question: question.question,
        reply: question.reply
      }));

    // استدعاء الخدمة لإرسال الأسئلة المحددة
    this.myserv.saveCommonQuestionChosen(this.selectedQuestions).subscribe({
      next: (data: any) => {
        // بعد إرسال الأسئلة، قم بإزالة الأسئلة المحددة من المصفوفة
        this.questions = this.questions.filter(question => !question.selected);
        console.log('Selected questions sent:', this.selectedQuestions);
      },
      error: (err) => {
        console.error(err);
      }
    });

    console.log(this.selectedQuestions);
  }

}
