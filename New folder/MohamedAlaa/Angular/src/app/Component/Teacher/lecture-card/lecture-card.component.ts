
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lecture-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lecture-card.component.html',
  styleUrls: ['./lecture-card.component.css'],
})
export class LectureCardComponent {
  @Input() lecture: any;
  @Output() edit = new EventEmitter<void>();

  onEdit() {
    this.edit.emit();
  }
}
