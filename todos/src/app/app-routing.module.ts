import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './shared/layouts/default/default.component';
import { MainComponent } from './shared/layouts/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { TodoComponent } from './pages/todo/todo.component';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {path:'', canActivate: [guestGuard], component: DefaultComponent, 
    children: [{path:'login', component: LoginComponent}, {path:'signup', component: SignupComponent}]},
  {path:'', canActivate: [authGuard], component: MainComponent, 
    children: [{path:'todo', component: TodoComponent}]}, 
  {path: '**', redirectTo: 'todo', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
