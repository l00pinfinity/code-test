import { createAction, props } from '@ngrx/store';
import { Task } from '../../interface/task';

export const fetchTasks = createAction('[Task] Fetch Tasks');
export const fetchTasksSuccess = createAction('[Task] Fetch Tasks Success', props<{ tasks: Task[] }>());
export const fetchTasksFailure = createAction('[Task] Fetch Tasks Failure', props<{ error: any }>());
export const setLoading = createAction('[Task] Set Loading', props<{ loading: boolean }>());

export const addTask = createAction('[Tasks] Add Task', props<{ task: Task }>());
export const addTaskSuccess = createAction('[Task] Add Task Success', props<{ task: Task }>());
export const addTaskFailure = createAction('[Task] Add Task Failure', props<{ error: any }>());

export const fetchTasksById = createAction('[Task] Fetch Tasks by ID', props<{ id: number }>());
export const fetchTasksByIdSuccess = createAction('[Task] Fetch Tasks by ID Success', props<{ tasks: Task }>());
export const fetchTasksByIdFailure = createAction('[Task] Fetch Tasks by ID Failure', props<{ error: any }>());

//Update by ID
export const updateTaskById = createAction('[Task] Update Task by ID', props<{ id: number, task: Task }>());
export const updateTaskByIdSuccess = createAction('[Task] Update Task by ID Success', props<{ task: Task }>());
export const updateTaskByIdFailure = createAction('[Task] Update Task by ID Failure', props<{ error: any }>());

//Delete by ID
export const deleteTaskById = createAction('[Task]  Delete Task by ID', props<{ id: number }>());
export const deleteTaskByIdSuccess = createAction('[Task] Delete Task by ID Success');
export const deleteTaskByIdFailure = createAction('[Task] Delete Task by ID Failure', props<{ error: any }>());

//Delete Tasks