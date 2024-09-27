import { Routes } from '@angular/router';
import { NotFoundComponent } from './Component/NotFound/not-found/not-found.component';
import { StudentComponent } from './Component/student/student/student.component';
import { LoginComponent } from './Component/Login/login/login.component';
import { RegistrationComponent } from './Component/Registration/registration/registration.component';
import { TeacherComponent } from './Component/Teacher/teacher.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
  {path:"", redirectTo:"Login",pathMatch:"full" ,
  }
  ,

  {path:"Login",component: LoginComponent
  }
  ,
  {path:"Registration",component: RegistrationComponent
  }
,
  {path:"Student",component: StudentComponent
  }
  ,
  {path:"teacher",component: TeacherComponent,  canActivate:[authGuard]
  }
  ,

  {path:"**",component: NotFoundComponent
  }
];
