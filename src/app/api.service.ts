import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import { Todo } from './todo';


const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: Http) { }

  // API: GET /todos
  public getAllTodos(): Observable<Todo[]> {

    return this.http
      .get(API_URL + '/todos')
      .pipe(map(response => {
        const todos = response.json();
        return todos.map((todo) => new Todo(todo));
      }))
      .catch(this.handleError);  // Need to fix this. Installed 'rxjs-compat@6' for rxjs to work
  }

  // API: POST /todos
  public createTodo(todo: Todo) {
    return this.http
      .post(API_URL + '/todos', todo)
      .pipe(map(response => {
        return new Todo(response.json());
      }))
      .catch(this.handleError);
  }

  // API: GET /todos/:id
  public getTodoById(todoId: number) {
    return this.http
      .get(API_URL + '/todos/' + todoId)
      .pipe(map(response => {
        return new Todo(response.json());
      }))
      .catch(this.handleError);
  }

  // API: PUT /todos/:id
  public updateTodo(todo: Todo) {
    return this.http
      .put(API_URL + '/todos/' + todo.id, todo)
      .pipe(map(response => {
        return new Todo(response.json());
      }))
      .catch(this.handleError);
  }

  // DELETE /todos/:id
  public deleteTodoById(todoId: number) {
    return this.http
      .delete(API_URL + '/todos/' + todoId)
      .pipe(map(response => null))
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
