import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuthenticated;
  username = "";

  constructor(private token: TokenService, private auth: AuthService) {
    this.isAuthenticated = this.token.isAuthentication;
    this.auth.getUser().subscribe({
      next: (response)=>{this.username = "Hi, "+response.user.name;}
    });
  }

  onLogout() { 
    this.auth.onLogout();
  }
}
