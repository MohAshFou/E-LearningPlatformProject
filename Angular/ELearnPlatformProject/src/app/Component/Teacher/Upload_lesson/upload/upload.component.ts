import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../../Services/User/user-auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { UploadLesson } from '../../../../Models/Teacher/upload-lesson';
import { TeacherService } from '../../../../Services/Teacher/teacher.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[DatePipe] ,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  Name: string = '';
  NewLesson: UploadLesson = {
    Title: '',
    Level: '',
    FileVideo: null,
    FileAttach: null,
    PDFHomework:null,
    Price: 0,
    AccessPeriod:0,
    uploadDate: '',

    Description: ''
  };
  public successMessage: string | null = null;

  invalidFields = {
    Title: false,
    Level: false,
    FileVideo: false,
    FileAttach: false,
    Price: false,
    Description: false,
    AccessPeriod: false ,
    PDFHomework: false
  };

  constructor(private service: UserAuthService , private datePipe: DatePipe , private TeacherService:TeacherService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
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

  onVideoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.NewLesson.FileVideo = file;
    }
  }

  onAttachSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.NewLesson.FileAttach = file;
    }
  }
  onHomeWork(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.NewLesson.PDFHomework = file;
    }
  }

  validateField(field: string): void {
    switch (field) {
      case 'Title':
        this.invalidFields.Title = !this.validTitle(this.NewLesson.Title);
        break;
      case 'Level':
        this.invalidFields.Level = !this.validLevel(this.NewLesson.Level);
        break;
      case 'FileVideo':
        this.invalidFields.FileVideo = !this.validFile(this.NewLesson.FileVideo);
        break;
      case 'FileAttach':
        this.invalidFields.FileAttach = !this.validFile(this.NewLesson.FileAttach);
        break;
      case 'Price':
        this.invalidFields.Price = !this.validPrice(this.NewLesson.Price);
        break;
      case 'Description':
        this.invalidFields.Description = !this.validDescription(this.NewLesson.Description);
        break;
        case 'AccessPeriod' :
          this.invalidFields.AccessPeriod = !this.validAccessPeriod(this.NewLesson.Price);
          break;
          case 'HomeWorkPDF' :
            this.invalidFields.AccessPeriod = !this.validPDFHomework(this.NewLesson.PDFHomework);
            break;
      default:
        break;
    }
  }

  validTitle(title: string): boolean {
    return title.trim() !== '' && title.length <= 50 && /^[a-zA-Z\u0600-\u06FF][a-zA-Z\u0600-\u06FF0-9\s]*$/.test(title);

  }
  validLevel(level: string): boolean {
    return ['F', 'S', 'T'].includes(level);
  }

  validFile(file: File | null): boolean {
    return file !== null;
  }
  validPDFHomework(file: File | null): boolean {
    return file !== null;
  }

  validPrice(price: number): boolean {
    return price > 0;
  }
  validAccessPeriod(price: number): boolean {
    return price > 0;
  }

  validDescription(description: string): boolean {
    return description.trim() !== '';
  }

  submitVideo(): void {
    for (const field in this.invalidFields) {
      this.validateField(field);
    }

    if (Object.values(this.invalidFields).every(isInvalid => !isInvalid)) {
      this.NewLesson.uploadDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || "";

      const formData = new FormData();
      formData.append('FileVideo', this.NewLesson.FileVideo as Blob);
      formData.append('FileAttach', this.NewLesson.FileAttach as Blob);
      formData.append('Title', this.NewLesson.Title);
      formData.append('Level', this.NewLesson.Level);
      formData.append('Price', this.NewLesson.Price.toString());
      formData.append('AccessPeriod', this.NewLesson.AccessPeriod.toString());
      formData.append('uploadDate', this.NewLesson.uploadDate);
      formData.append('Description', this.NewLesson.Description);
      formData.append('HomeWork', this.NewLesson.PDFHomework as Blob );

      console.log(this.NewLesson);

      this.TeacherService.AddNewLesson(formData).subscribe({
        next: (response) => {
          this.successMessage = 'Lesson added successfully!';

          this.NewLesson = {
            Title: "",
            AccessPeriod: 0,
            Description: "",
            Price: 0,
            FileAttach: null,
            FileVideo: null,
            Level: "" ,
            uploadDate: "",
            PDFHomework: null
        };

        },
        error: (error) => {
          console.error('Error adding lesson:', error);
        }
      });

      console.log(this.NewLesson);
    } else {
      console.error('Validation failed:', this.invalidFields);
    }
  }

}
