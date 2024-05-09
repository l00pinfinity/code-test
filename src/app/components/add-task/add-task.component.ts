import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { Store } from '@ngrx/store';
import { addTask } from '../../core/store/actions/task.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatToolbarModule, MatButtonModule ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {

  taskForm!: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private taskService: TaskService, private store: Store) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      id: [this.generateRandomId()], // Generate a random number for id
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      createdAt: [new Date(), Validators.required]
    });
  }

  addTask() {
    if (this.taskForm.valid) {
        const newTask = this.taskForm.value;
        this.store.dispatch(addTask({ task: newTask }));
        this.router.navigate(['/tasks']);
    } else {
        console.error('Form is invalid');
    }
}

  generateRandomId(): number {
    return Math.floor(Math.random() * 100); // Generate a random number between 0 and 99
  }

}
