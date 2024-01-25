import { Component, Input } from '@angular/core';
import { ITodo } from 'src/app/core/models/todo.model';

export type Types = 'OPEN' | 'PROGRESS' | 'TESTING' | 'DONE';
export const Status = ['OPEN', 'PROGRESS', 'TESTING', 'DONE'];

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent {
  @Input() type: Types = 'OPEN';
  @Input() todo!: ITodo;
}
