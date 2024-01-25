import { Injectable } from '@angular/core';
import { ITodo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoints } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAllTodo(): Observable<any> {
    return this.http.get<any>(`${apiEndpoints.TodoEndpoint.getAllTodo}`);
  }

  addTodo(data: ITodo): Observable<any> {
    return this.http.post<any>(`${apiEndpoints.TodoEndpoint.addTodo}`, data);
  }

  updateTodo(id: number, data: ITodo): Observable<any> {
    return this.http.post<any>(`${apiEndpoints.TodoEndpoint.updateTodo}/${id}`, data);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.post<any>(`${apiEndpoints.TodoEndpoint.deleteTodo}/${id}`, '');
  }

  sendEmail(): Observable<any> {
    return this.http.get<any>(`${apiEndpoints.TodoEndpoint.sendMail}`);
  }
}
