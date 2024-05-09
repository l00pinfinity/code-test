import { createReducer, on } from "@ngrx/store";
import * as TaskActions from '../actions/task.actions';
import { Task } from "../../interface/task";

export interface TaskState {
    tasks: Task[];
    error: any;
    loading: boolean;
}

export const initialState: TaskState = {
    tasks: [],
    error: null,
    loading: false
}

export const taskReducer = createReducer(
    initialState,
    on(TaskActions.fetchTasks, state => ({ ...state, loading: true })),
    on(TaskActions.fetchTasksSuccess, (state, { tasks }) => ({ ...state, tasks, error: null, loading: false })),
    on(TaskActions.fetchTasksFailure, (state, { error }) => ({ ...state, tasks: [], error, loading: false })),
    on(TaskActions.setLoading, (state, { loading }) => ({ ...state, loading })),
    on(TaskActions.addTaskSuccess, (state, { task }) => ({...state,tasks: [...state.tasks, task],error: null})),
    on(TaskActions.addTaskFailure, (state, { error }) => ({ ...state, error })),
    on(TaskActions.updateTaskByIdSuccess, state => ({ ...state, error: null })),
    on(TaskActions.updateTaskByIdFailure, (state, { error }) => ({ ...state, error })),
    on(TaskActions.deleteTaskByIdSuccess, state => ({ ...state, error: null })),
    on(TaskActions.deleteTaskByIdFailure, (state, { error }) => ({ ...state, error }))
);