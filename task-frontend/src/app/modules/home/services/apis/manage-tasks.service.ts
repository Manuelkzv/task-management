import { Injectable } from '@angular/core';
import { Task } from '../../utils/interfaces';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { StorageService } from '../../../../_services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ManageTasksService {
  readonly manageTasksUtl = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.storageService.getUser()?.token,
    }),
  };

  constructor(
    protected http: HttpClient,
    private storageService: StorageService,
  ) {}

  get(): Observable<any> {
    return this.http.get(
      `/api/task/list/created-by/${this.storageService.getUser().id}`,
      this.httpOptions,
    );
  }

  create(newTask: Task): Observable<Task> {
    return this.http.post<Task>(
      '/api/task',
      {
        ...newTask,
      },
      this.httpOptions,
    );
  }

  edit(task: Task): Observable<Task> {
    return this.http.put<Task>(
      `/api/task/${task.id}`,
      {
        ...task,
      },
      this.httpOptions,
    );
  }

  delete(id: string): Observable<Task> {
    return this.http.delete<Task>(`/api/task/${id}`, this.httpOptions);
  }
}
