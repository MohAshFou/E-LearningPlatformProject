import { Routes } from '@angular/router';
import { teacherGuard } from './Guards/teacher.guard';
import { adminGuard } from './Guards/admin.guard';
import { studentGuard } from './Guards/student.guard';
import { NotFoundComponent } from './Component/NotFound/not-found/not-found.component';

import LoginComponent from './Component/Login/login/login.component';
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
import { SubmittedhomeworkDetailComponent } from './Component/Teacher/homework/submittedhomework-detail/submittedhomework-detail.component';
import { ReceiptComponent } from './Component/Admin/receipt/receipt.component';
import { ManageAccountsComponent } from './Component/Admin/manage-accounts/manage-accounts.component';
import { WatchVedioComponent } from './Component/student/Watching/watch-vedio/watch-vedio.component';
import { ReceiptStudentComponent } from './Component/student/receipt/receipt-student/receipt-student.component';

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
        component: LecturesStudentComponent
      },

      {
        path: "Lectures",
        component: LecturesStudentComponent
      } ,
      {
        path: "receipt",
        component: ReceiptStudentComponent
      },
      {
        path:"WatchVedio",
        component: WatchVedioComponent
      }


    ]
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [adminGuard] ,children:[

      {
        path: "Receipt",
        component: ReceiptComponent
      },

      {
        path: "ManageAccounts",
        component: ManageAccountsComponent
      }


    ]
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
        path: "homework/:id",
        component: SubmittedhomeworkDetailComponent
      }
      ,
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
