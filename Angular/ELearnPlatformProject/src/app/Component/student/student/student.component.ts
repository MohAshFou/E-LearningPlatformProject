import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../Services/User/user-auth.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {

  Name=""

 constructor( private service:UserAuthService){}





  ngOnInit(): void {
    this.service.getRoleAndName().subscribe({
     next: (d) => {
        this.Name= d.username
     },
     error: (e: any) => {

     }
   });
   }

}
