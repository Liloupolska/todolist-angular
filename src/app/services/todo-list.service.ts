import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Todo } from 'src/models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todoListInternal: Array<Todo>|null = null;
  
  constructor(
    private httpClient: HttpClient,
  ) { }

  public get todoList(): Observable<Array<Todo>> {
    if (this.todoListInternal === null) {
      return this.httpClient.get<Array<Todo>>('https://192.168.215.76:8000/api/todos');
    }
    

    // Load from localStorage on first call.
    //return this.todoListInternal ?? [];
    return from([]);
  }

  // public set todoList(val: Array<Todo>) {
  //   this.todoListInternal = val;
  //
  //   localStorage.setItem(TodoListService.STORAGE_KEY, JSON.stringify(this.todoListInternal));
  // }

  public createTodo(todo: Todo): void {
    this.httpClient.post('https://192.168.215.76:8000/api/todos', todo)
      .subscribe((data) => {
        console.log(data);
      });
  }                                  
}
