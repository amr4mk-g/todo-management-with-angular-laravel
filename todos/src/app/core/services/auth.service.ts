import { Injectable } from '@angular/core';
import { ILogin, ISignup } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoints } from '../constants/constants';
import { TokenService } from './token.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private token: TokenService) { }

  onLogin(data: ILogin) {
    return this.http.post<any>(`${apiEndpoints.AuthEndpoint.login}`, data).pipe(
      map((response)=>{if(response){this.token.setToken(response.token)} return response;})
    ) 
  }

  onSignup(data: ISignup) {
    return this.http.post<any>(`${apiEndpoints.AuthEndpoint.signup}`, data).pipe(
      map((response)=>{if(response){this.token.setToken(response.token)} return response;})
    ) 
  }

  onLogout() {
    this.token.removeToken();
  }

  getUser() { 
    return this.http.get<any>(`${apiEndpoints.AuthEndpoint.currUser}`);
  }

  // onLogout() {
  //   return this.http.post<ILoginResponse>(`${apiEndpoints.AuthEndpoint.logout}`, '').subscribe(
  //     {next: (response)=>{if(response){this.token.removeToken();}}}
  //   )
  // }

  // forgetPassword(data: any) {
  //   return this.http.post(this.url+'forget', data) 
  // }

  // resetPassword(data: any) {
  //   return this.http.post(this.url+'reset', data) 
  // }
}
