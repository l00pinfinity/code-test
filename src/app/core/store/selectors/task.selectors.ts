    import { createFeatureSelector, createSelector } from "@ngrx/store";
    import { TaskState } from "../reducers/task.reducer";

    export const selectTaskState = createFeatureSelector<TaskState>('task');

    export const selectTasks = createSelector(
        selectTaskState,
        state => state.tasks
    );

    export const selectError = createSelector(
        selectTaskState,
        state => state.error
    );

    export const selectLoading = createSelector(
        selectTaskState,
        state => state.loading
    )