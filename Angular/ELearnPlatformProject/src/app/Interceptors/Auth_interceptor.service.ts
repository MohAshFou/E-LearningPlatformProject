import { HttpClient, HttpHandlerFn, HttpRequest } from "@angular/common/http";

 export  function  AuthInterceptor(req:HttpRequest<any> , next:HttpHandlerFn){


   return  next(req)
 }
