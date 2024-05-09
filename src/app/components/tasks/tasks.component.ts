import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Task } from '../../core/interface/task';
import { Observable } from 'rxjs';
import { TaskService } from '../../core/services/task.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteTaskById, fetchTasks } from '../../core/store/actions/task.actions';
import { selectTasks, selectError, selectLoading } from '../../core/store/selectors/task.selectors';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatToolbarModule, MatButtonModule ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  tasks$!: Observable<Task[]>;
  error$!: Observable<any>;
  isLoading$!: Observable<boolean>;

  constructor(private http: HttpClient, private taskService: TaskService, private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.fetchTasks();
    this.isLoading$ = this.store.select(selectLoading);
  }

  fetchTasks() {
    this.store.dispatch(fetchTasks());
    this.tasks$ = this.store.select(selectTasks);
    this.error$ = this.store.select(selectError);
  }

  addTask() {
    this.router.navigate(['/add']);
  }

  editTask(id: number) {
    this.router.navigate(['/task', id]);
    console.log(id);
  }

  deleteTask(id: number) {
    this.store.dispatch(deleteTaskById({ id }));
    this.fetchTasks();
  }
}
