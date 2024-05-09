import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import * as TaskActions from '../actions/task.actions';
import { TaskService } from "../../services/task.service";

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) { }

  fetchTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.fetchTasks),
      mergeMap(() => this.taskService.fetchTasks()
        .pipe(
          map(tasks => TaskActions.fetchTasksSuccess({ tasks })),
          catchError(error => of(TaskActions.fetchTasksFailure({ error })))
        ))
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      switchMap(({ task }) =>
        this.taskService.addTask(task).pipe(
          map(addedTask => TaskActions.addTaskSuccess({ task: addedTask })),
          catchError(error => of(TaskActions.addTaskFailure({ error })))
        )
      )
    )
  );

  fetchTaskById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.fetchTasksById),
      switchMap(({ id }) =>
        this.taskService.fetchTaskById(id).pipe(
          map(task => TaskActions.fetchTasksByIdSuccess({ tasks: task })),
          catchError(error => of(TaskActions.fetchTasksByIdFailure({ error })))
        )
      )
    )
  );

  updateTaskById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTaskById),
      switchMap(({ id, task }) =>
        this.taskService.updateTaskById(id, task).pipe(
          map(updatedTask => TaskActions.updateTaskByIdSuccess({ task: updatedTask })),
          catchError(error => of(TaskActions.updateTaskByIdFailure({ error })))
        )
      )
    )
  );

  deleteTaskById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTaskById),
      switchMap(({ id }) =>
        this.taskService.deleteTaskById(id).pipe(
          map(() => TaskActions.deleteTaskByIdSuccess()),
          catchError(error => of(TaskActions.deleteTaskByIdFailure({ error })))
        )
      )
    )
  );
}