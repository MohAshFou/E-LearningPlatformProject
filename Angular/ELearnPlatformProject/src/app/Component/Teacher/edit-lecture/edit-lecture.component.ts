

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-lecture',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-lecture.component.html',
  styleUrls: ['./edit-lecture.component.css'],
})
export class EditLectureComponent {
  @Input() lecture: any;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>(); 

  editedLecture: any;

  ngOnChanges() {
    
    this.editedLecture = { ...this.lecture };
  }

  onSave() {
    this.save.emit(this.editedLecture);
  }

  closeModal() {
    this.close.emit(); 
  }
}
