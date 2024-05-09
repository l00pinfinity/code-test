import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Task } from '../../core/interface/task';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectError } from '../../core/store/selectors/task.selectors';
import { deleteTaskById, updateTaskById } from '../../core/store/actions/task.actions';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatToolbarModule, MatButtonModule, MatIconModule, ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit {

  task!: Task;
  taskForm!: FormGroup;
  error$!: Observable<any>;

  statusOptions: any[] = [
    { value: 'pending', viewValue: 'Pending' },
    { value: 'completed', viewValue: 'Completed' }
  ];

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private taskService: TaskService,private store: Store, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      createdAt: [{ value: '', disabled: true }]
  });

  this.loadTask();
  this.error$ = this.store.select(selectError);
  }

  loadTask() {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.fetchTaskById(taskId).subscribe(task => {
      this.task = task;
      // Patch the form values with task details
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt
      });
    }, error => {
      console.error('Error loading task:', error);
    });
  }

  updateTask() {
    if (this.taskForm.valid && this.task) {
        const updatedTask: Task = { ...this.task, ...this.taskForm.value };
        this.store.dispatch(updateTaskById({ id: this.task.id, task: updatedTask }));
        this.snackBar.open('Task updated successfully', 'Close', {
          duration: 1000
        });
        this.router.navigate(['/tasks']);
    }
  }
  
  deleteTask() {
    if (this.task) {
        this.store.dispatch(deleteTaskById({ id: this.task.id }));
        this.snackBar.open('Task deleted successfully', 'Close', {
          duration: 3000
        });  
        this.router.navigate(['/tasks']);
    }
  }
  

}
