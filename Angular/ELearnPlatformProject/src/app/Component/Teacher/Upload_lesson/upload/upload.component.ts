import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../../Services/User/user-auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule, // Only import CommonModule
    FormsModule   // Import FormsModule for ngModel
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'] // Corrected property name to styleUrls
})
export class UploadComponent implements OnInit {
  Name: string = '';
  videoUrl: string = '';
  videoTitle: string = '';
  videoLevel: string = '';
  videoPrice: number = 0;
  uploadDate: string = '';
  uploadTime: string = '';
  videoDescription: string = '';

  fileName: string = '';
  uploadProgress: number = 0;
  uploadInProgress: boolean = false;

  constructor(private service: UserAuthService) {}

  ngOnInit(): void {

    if (localStorage.getItem("token")) {
    this.service.getRoleAndName().subscribe({
      next: (d) => {
        this.Name = d.username;
      },
      error: (e: any) => {
        console.error(e);
      }
    });
  }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.uploadInProgress = true;

      const interval = setInterval(() => {
        if (this.uploadProgress < 100) {
          this.uploadProgress += 10;
        } else {
          clearInterval(interval);
          this.uploadInProgress = false;
        }
      }, 500);
    }
  }

  cancelUpload(): void {
    this.uploadInProgress = false;
    this.uploadProgress = 0;
    this.fileName = '';
  }

  uploadFromUrl(): void {
    console.log(`Uploading video from URL: ${this.videoUrl}`);
  }

  submitVideo(): void {
    const videoData = {
      title: this.videoTitle,
      level: this.videoLevel,
      price: this.videoPrice,
      uploadDate: this.uploadDate,
      uploadTime: this.uploadTime,
      description: this.videoDescription
    };

    console.log(videoData);
  }

  openFileDialog(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
}
