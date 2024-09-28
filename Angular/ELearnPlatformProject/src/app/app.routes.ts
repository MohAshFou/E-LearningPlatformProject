import { Routes } from '@angular/router';
import { NotFoundComponent } from './Component/NotFound/not-found/not-found.component';
import { StudentComponent } from './Component/student/student/student.component';
import { LoginComponent } from './Component/Login/login/login.component';
import { RegistrationComponent } from './Component/Registration/registration/registration.component';
import { TeacherComponent } from './Component/Teacher/teacher.component';
import { authGuard } from './Guards/auth.guard';
import { StuInfoComponent } from './Component/Teacher/stu-info/stu-info.component';
import { LectureComponent } from './Component/Teacher/lecture/lecture.component';
import { teacherGuard } from './Guards/teacher.guard';
import { studentGuard } from './Guards/student.guard';
import { adminGuard } from './Guards/admin.guard';
import { AdminComponent } from './Component/Admin/admin.component';
import { UploadComponent } from './Component/Teacher/Upload_lesson/upload/upload.component';



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
  {path:"student",component: StudentComponent , canActivate:[studentGuard]
  }
  ,
  {path:"admin",component: AdminComponent , canActivate:[adminGuard]
  }
  ,
  {path:"teacher",component: TeacherComponent,  canActivate:[teacherGuard] ,children:[
      {  path:"",component: StuInfoComponent  },
      {  path:"Lessons",component: LectureComponent  }
      ,
       {  path:"upload",component: UploadComponent  }

  ]
  }

,
  {path:"**",component: NotFoundComponent
  }
];
