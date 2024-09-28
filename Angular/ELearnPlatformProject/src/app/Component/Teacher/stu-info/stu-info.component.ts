import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stu-info',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './stu-info.component.html',
  styleUrl: './stu-info.component.css'
})
export class StuInfoComponent {
  Number:number=15;
}
