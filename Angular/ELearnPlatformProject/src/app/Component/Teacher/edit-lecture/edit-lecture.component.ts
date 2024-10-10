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

  validFile(file: File | null): boolean {
    return file !== null;
  }

  onVideoSelected(event: any) {
    this.selectedVideo = event.target.files[0];
    this.validateField('videoURL');
  }

  onHomeWorkPDF(event: any) {
    this.selectedHomeWorkPDF = event.target.files[0];
    this.validateField('homeworkURL');
  }

  onFileSelected(event: any) {
    this.selectedAttachedFile = event.target.files[0];
    this.validateField('pdfURL');
  }

  removeVideo() {
    this.editedLecture.videoURL = null;
    this.invalidFields.videoURL = true;
  }

  removeHomeworkPDF() {
    this.editedLecture.homeworkURL = null;
    this.invalidFields.homeworkURL = true;
  }

  removePDF() {
    this.editedLecture.pdfurl = null;
    this.invalidFields.pdfURL = true;
  }

  async save() {
    // Validate all fields before saving

    console.log(this.editedLecture)
    for (const field in this.invalidFields) {
      this.validateField(field);
    }

    if (Object.values(this.invalidFields).some((invalid) => invalid)) {
      console.error('Some fields are invalid. Please correct them before saving.');
      return; // Prevent save if there are invalid fields
    }

    const formData = new FormData();
    // Append lesson data to the form data
    formData.append('Title', this.editedLecture.title);
    formData.append('GradeLevel', this.editedLecture.gradeLevel);
    formData.append('Description', this.editedLecture.description);
    formData.append('UploadDate', this.editedLecture.uploadDate);
    formData.append('FeeAmount', this.editedLecture.feeAmount.toString()); // Ensure it's a string

    if (this.selectedVideo) {
      formData.append('VideoURL', this.selectedVideo);
    } else if (this.editedLecture.videoURL) {
      formData.append('VideoURL', this.editedLecture.videoURL);
    }

    if (this.selectedHomeWorkPDF) {
      formData.append('HomeWork', this.selectedHomeWorkPDF);
    } else if (this.editedLecture.homeworkURL) {
      formData.append('HomeWork', this.editedLecture.homeworkURL);
    }

    if (this.selectedAttachedFile) {
      formData.append('PDFURL', this.selectedAttachedFile);
    } else if (this.editedLecture.pdfurl) {
      formData.append('PDFURL', this.editedLecture.pdfurl);
    }

    try {
      const response = await this.http.put(`https://localhost:7217/api/teacher/UpdateLesson/${this.editedLecture.lessonId}`, formData).toPromise();
      console.log('Lesson updated successfully:', response);
      this.onSave.emit();
      this.closeModal();
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  }

  closeModal() {
    this.onClose.emit();
    this.showModal = false;
  }
}
