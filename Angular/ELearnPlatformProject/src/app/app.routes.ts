import { Routes } from '@angular/router';
import { teacherGuard } from './Guards/teacher.guard';
import { adminGuard } from './Guards/admin.guard';
import { studentGuard } from './Guards/student.guard';
import { NotFoundComponent } from './Component/NotFound/not-found/not-found.component';

import { LoginComponent } from './Component/Login/login/login.component';
import { RegistrationComponent } from './Component/Registration/registration.component';
import { TeacherComponent } from './Component/Teacher/teacher.component';

import { StuInfoComponent } from './Component/Teacher/stu-info/stu-info.component';
import { LectureComponent } from './Component/Teacher/lecture/lecture.component';


import { AdminComponent } from './Component/Admin/admin.component';
import { UploadComponent } from './Component/Teacher/Upload_lesson/upload/upload.component';
import { StudentComponent } from './Component/student/student.component';
import { HomeworkComponent } from './Component/Teacher/homework/homework.component';
import { ChatComponent } from './Component/Teacher/chat/chat.component';
import { LecturesStudentComponent } from './Component/student/lectures-student/lectures-student.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "Login",
    pathMatch: "full"
  },
  {
    path: "Login",
    component: LoginComponent
  },
  {
    path: "Registration",
    component: RegistrationComponent
  },
  {
    path: "student",
    component: StudentComponent,
    canActivate: [studentGuard] , children: [
      {
        path: "",
        component: StuInfoComponent
      },

      {
        path: "Lectures",
        component: LecturesStudentComponent
      } ,
      {
        path: "Question And Answer",
        component: ChatComponent
      }
    ]
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [adminGuard]
  },
  {
    path: "teacher",
    component: TeacherComponent,
    canActivate: [teacherGuard],
    children: [
      {
        path: "",
        component: StuInfoComponent
      },
      {
        path: "level/:id",
        component: LectureComponent
      },
      {
        path: "upload",
        component: UploadComponent
      } ,
      {
        path: "homework",
        component: HomeworkComponent
      },
      {
        path: "chat",
        component: ChatComponent
      }
    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];
