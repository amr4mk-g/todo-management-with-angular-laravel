import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    let token = this.getToken();
    if (token) this.updateToken(true);
    else this.updateToken(false);
  }

  getToken(): string | null {
    return localStorage.getItem(constants.CURRENT_TOKEN);
  }

  setToken(to: string) {
    this.updateToken(true);
    localStorage.setItem(constants.CURRENT_TOKEN, to);
  }

  removeToken() {
    this.updateToken(false);
    localStorage.removeItem(constants.CURRENT_TOKEN);
  }

  updateToken(status: boolean) {
    this.isAuthentication.next(status);
  }
}
