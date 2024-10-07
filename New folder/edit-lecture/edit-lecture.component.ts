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

  editedLecture: any;
  selectedVideo: File | null = null;  
  selectedFile: File | null = null; 
  showModal: boolean =true;

  constructor(private http: HttpClient) {}

  ngOnChanges() {
    this.editedLecture = { ...this.lecture };
  }

  
  onVideoSelected(event: any) {
    this.selectedVideo = event.target.files[0]; 
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; 
  }

  async Save() {
    if (this.selectedVideo) {
      await this.uploadVideo();  
    }
    
    if (this.selectedFile) {
      await this.uploadFile();
    }

    this.onSave.emit(this.editedLecture); 
  }

  uploadVideo() {
    const formData = new FormData();
    formData.append('file', this.selectedVideo!); 

    return this.http.post('/api/Video/Upload', formData)
      .toPromise()
      .then(response => {
        console.log('Video uploaded successfully:', response);
      })
      .catch(error => {
        console.error('Error uploading video:', error);
      });
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile!);  

    return this.http.post('/api/File/Upload', formData)
      .toPromise()
      .then(response => {
        console.log('File uploaded successfully:', response);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  }

  closeModal() {
    this.showModal= false;
    this.onClose.emit(); 
    

  }
}
