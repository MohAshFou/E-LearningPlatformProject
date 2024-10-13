import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-lecture',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-lecture.component.html',
  styleUrls: ['./edit-lecture.component.css'],
})
export class EditLectureComponent {
  @Input() lecture: any;
  @Output() onSave = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();

  editedLecture: any = {};
  selectedVideo: File | null = null;
  selectedHomeWorkPDF: File | null = null;
  selectedAttachedFile: File | null = null;
  showModal: boolean = true;
  errorMessage!:string|null;
  showError:boolean=false;

  invalidFields = {
    title: false,
    description: false,
    uploadDate: false,
    feeAmount: false,
    gradeLevel: false,
    videoURL: false,
    pdfURL: false,
    homeworkURL: false,
  };

  hasChanges: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnChanges() {
    this.editedLecture = { ...this.lecture };
  }

  cha() {
    this.hasChanges = true;
  }

  validateField(field: string): void {
    switch (field) {
      case 'title':
        this.invalidFields.title = !this.validTitle(this.editedLecture.title);
        break;
      case 'description':
        this.invalidFields.description = !this.validDescription(this.editedLecture.description);
        break;
      case 'uploadDate':
        this.invalidFields.uploadDate = !this.validDate(this.editedLecture.uploadDate);
        break;
      case 'feeAmount':
        this.invalidFields.feeAmount = !this.validPrice(this.editedLecture.feeAmount);
        break;
      case 'gradeLevel':
        this.invalidFields.gradeLevel = !this.validGradeLevel(this.editedLecture.gradeLevel);
        break;
      case 'videoURL':
        this.invalidFields.videoURL = this.selectedVideo ? !this.validFile(this.selectedVideo) : false;
        this.hasChanges = true;
        break;
      case 'pdfURL':
        this.invalidFields.pdfURL = this.selectedAttachedFile ? !this.validFile(this.selectedAttachedFile) : false;
        this.hasChanges = true;
        break;
      case 'homeworkURL':
        this.invalidFields.homeworkURL = this.selectedHomeWorkPDF ? !this.validFile(this.selectedHomeWorkPDF) : false;
        this.hasChanges = true;
        break;
      default:
        break;
    }
  }

  validTitle(title: string): boolean {
    return title.trim() !== '' && title.length <= 50 && !/^\d/.test(title);
  }

  validDescription(description: string): boolean {
    return description.trim() !== '';
  }

  validDate(date: string): boolean {
    return date.trim() !== '';
  }

  validPrice(price: number): boolean {
    return price > 0;
  }

  validGradeLevel(gradeLevel: string): boolean {
    return gradeLevel.trim() !== '';
  }

  validFile(file: File): boolean {
    return file !== undefined && file !== null;
  }

  removeVideo(): void {
    this.editedLecture.videoURL = null;
    this.selectedVideo = null;
    this.hasChanges = true;
  }

  removeHomeworkPDF(): void {
    this.editedLecture.homeworkURL = null;
    this.selectedHomeWorkPDF = null;
    this.hasChanges = true;
  }

  removePDF(): void {
    this.editedLecture.pdfurl = null;
    this.selectedAttachedFile = null;
    this.hasChanges = true;
  }

  onVideoSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && this.validFile(file)) {
      this.selectedVideo = file;
    } else {
      this.selectedVideo = null;
    }
    this.validateField('videoURL');
  }

  onHomeWorkPDF(event: any): void {
    const file: File = event.target.files[0];
    if (file && this.validFile(file)) {
      this.selectedHomeWorkPDF = file;
    } else {
      this.selectedHomeWorkPDF = null;
    }
    this.validateField('homeworkURL');
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && this.validFile(file)) {
      this.selectedAttachedFile = file;
    } else {
      this.selectedAttachedFile = null;
    }
    this.validateField('pdfURL');
  }

  save(): void {
    this.showError = false;
    if (!this.selectedVideo && !this.editedLecture.videoURL) {
      this.invalidFields.videoURL = true;
      this.showError = true;
      this.errorMessage = 'Please upload a lecture video.';
      return;
    }
    if (!this.selectedHomeWorkPDF && !this.editedLecture.homeworkURL) {
      this.invalidFields.homeworkURL = true;
      this.showError = true;
      this.errorMessage = 'Please upload a homework PDF.';
      return;
    }
    if (!this.selectedAttachedFile && !this.editedLecture.pdfurl) {
      this.invalidFields.pdfURL = true;
      this.showError = true;
      this.errorMessage = 'Please upload an attachment file.';
      return;
    }
    if (!this.hasChanges) {
      this.showError = true;
      this.errorMessage = 'No changes detected.';
      return;
    }

    // إضافة الكود الخاص بحفظ البيانات هنا.

    this.onSave.emit(this.editedLecture);
    this.closeModal();
  }

  closeModal(): void {
    this.onClose.emit();
  }
}
