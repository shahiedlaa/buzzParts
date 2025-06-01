import { Routes } from '@angular/router';
import { LogsComponent } from './logs/logs.component';
import { CreateLogsComponent } from './logs/create-logs/create-logs.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { HomeComponent } from './home/home.component';
import { logResolver } from './shared/resolvers/log.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'logs',
    component: LogsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-logs',
    component: CreateLogsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-logs/:busId',
    component: CreateLogsComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: logResolver,
    },
  },
];
