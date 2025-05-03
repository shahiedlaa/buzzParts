import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LogsService } from '../services/logs-service';
import { of } from 'rxjs';

export const logResolver: ResolveFn<boolean> = (route, state) => {
  const logService = inject(LogsService);
  const busId = route.paramMap.get('busId');
  return busId ? logService.getLogsByBusIdFromService(busId) : of(null);
};
