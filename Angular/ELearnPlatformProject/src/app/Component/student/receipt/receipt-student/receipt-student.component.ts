import { Component } from '@angular/core';
import { RelationsService } from '../../../../Services/Student/relations.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receipt-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receipt-student.component.html',
  styleUrl: './receipt-student.component.css'
})
export class ReceiptStudentComponent {
  constructor(private StuInfo : RelationsService,private router: Router){}
  imageUrl: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;
  showError: boolean = false;
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (!allowedTypes.includes(file.type)) {
        this.errorMessage = 'Invalid file type. Only JPEG, PNG, and GIF are allowed.';
        this.imageUrl = null;
        this.showError = true;
        return;
      }

      this.errorMessage = null;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
      this.showError = false;
    }
  }
  submit() {
    if (!this.imageUrl) {
      this.errorMessage = 'Please select a valid image before submitting.';
      this.showError = true;
      return;
    }
    console.log(this.StuInfo.GetStudentInfo());
    console.log('Submitting image:', this.imageUrl);
    this.router.navigate(['/student']);
  }

  GoToHome()
  {
    this.router.navigate(['/student']);
  }

}
