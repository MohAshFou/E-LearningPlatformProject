import { Component } from '@angular/core';
import { NavParComponent } from './NavBar/nav-par/nav-par.component';
import { StuInfoComponent } from './stu-info/stu-info.component';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [NavParComponent ,StuInfoComponent],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {

}
