import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ITodo } from 'src/app/core/models/todo.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TodoService } from 'src/app/core/services/todo.service';
import { Status } from 'src/app/shared/components/todo-card/todo-card.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit{
  todos: ITodo[] = [];
  filteredTodos: ITodo[] = [];
  todoForm!: FormGroup;
  isPanelOpen: boolean = false;
  todoStatus = Status;
  currTodoId = 0;
  filterStatus = '';
  userEmail = '';
  
  constructor (private service: TodoService, private fb: FormBuilder, private auth: AuthService){
    this.todoForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]), 
      status: new FormControl('OPEN', [Validators.required])
    });

    this.auth.getUser().subscribe({
      next: (response)=>{this.userEmail = response.user.email;}
    });
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.service.getAllTodo().subscribe({
      next: (response)=>{this.todos = response.todos; this.filteredTodos = this.todos;}
    });
  }

  onClosePanel() {
    this.isPanelOpen = false;
  }

  openPanel() {
    this.isPanelOpen = true;
  }

  openAddTodo() {
    this.currTodoId = 0;
    this.todoForm.reset();
    this.openPanel();
  }

  onLoadTodo(item: ITodo) {
    this.currTodoId = item.id!!;
    this.todoForm.patchValue({
      title: item.title, description: item.description, status: item.status
    });
    this.openPanel();
  }

  onFilterByStatus(status: string) {
    // can send new request to search by query, or filter current list
    this.filterStatus = status;
    if (status == '') this.filteredTodos = this.todos;
    else this.filteredTodos = this.todos.filter(item => item.status === status);
  }

  onSubmit() {
    if (this.todoForm.valid){
      if (this.currTodoId == 0) {
        this.service.addTodo(this.todoForm.value).subscribe({
          next: (response)=>{this.getAllTodos();  this.onClosePanel();}
        });
      } else {
        this.service.updateTodo(this.currTodoId, this.todoForm.value).subscribe({
          next: (response)=>{this.getAllTodos();  this.onClosePanel();}
        });
      }
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  deleteTodo() {
    if (this.currTodoId == 0) {
      this.onClosePanel();
    } else {
      this.service.deleteTodo(this.currTodoId).subscribe({
        next: (response)=>{this.getAllTodos();  this.onClosePanel();}
      });
    }
  }

  sendListToMail() { 
    console.log(this.userEmail)
    this.service.sendEmail().subscribe({
      next: (response)=>{console.log(response)}
    });
  }
}  
