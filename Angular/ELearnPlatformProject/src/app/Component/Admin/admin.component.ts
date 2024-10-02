import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../Services/User/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  name = '';

  constructor(private service: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if (token) {
      this.service.getRoleAndName().subscribe({
        next: (data) => {
          this.name = data.username || '';
        },
        error: () => {
          alert("Session expired. Please log in again.");
          this.router.navigate(['login']);
        }
      });
    } else {
      this.router.navigate(['login']); 
    }
  }
}
