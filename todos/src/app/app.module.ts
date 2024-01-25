import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { TodoComponent } from './pages/todo/todo.component';
import { TodoCardComponent } from './shared/components/todo-card/todo-card.component';
import { MainComponent } from './shared/layouts/main/main.component';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { DefaultComponent } from './shared/layouts/default/default.component';
import { AlertComponent } from './shared/utilities/alert/alert.component';
import { PanelComponent } from './shared/utilities/panel/panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { SignupComponent } from './pages/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent, LoginComponent, TodoComponent, TodoCardComponent,
    MainComponent, HeaderComponent, DefaultComponent, AlertComponent,
    PanelComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule {}
