import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { taskReducer } from './core/store/reducers/task.reducer';
import { TaskEffects } from './core/store/effects/task.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({task:taskReducer}), provideEffects(TaskEffects),provideState({ name: 'task', reducer: taskReducer }), provideAnimationsAsync(),provideHttpClient()]
};
