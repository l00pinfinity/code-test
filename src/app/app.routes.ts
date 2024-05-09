import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

export const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'tasks', component: TasksComponent },
    { path: 'task/:id', component: TaskDetailComponent },
    { path: 'add', component: AddTaskComponent },
    { path: '**', redirectTo: '/tasks', pathMatch: 'full' }
];
