import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../Services/User/user-auth.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  name=''
constructor(private service:UserAuthService){


}












  ngOnInit(): void {
   this.service.getRoleAndName().subscribe({
    next: (d) => {
       this.name= d.username
    },
    error: (e: any) => {

    }
  });
  }
















}
