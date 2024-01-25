import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class httpInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenService = inject (TokenService);
    tokenService.isAuthentication.subscribe({
      next: (value) => { if(value){
        req = req.clone({setHeaders: {Authorization: `Bearer ${tokenService.getToken()}`}});
      }}
    });
    return next.handle(req);
  }
}

//   const router = inject(Router);
//   return next(req).pipe(catchError((e: HttpErrorResponse)=>{
//     if(e.status == 401) {
//       tokenService.removeToken();
//       router.navigate(['']);
//     }
//     let error = e.error?.error?.message || e.statusText;
//     return throwError(()=>error);