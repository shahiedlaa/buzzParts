import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  readonly url = 'http://localhost:3000/api/logs';
  public errorMessage!: string;
  private _snackBar = inject(MatSnackBar);

  constructor(private http: HttpClient, private router: Router) {}

  getLogsFromService() {
    return this.http.get<any>(this.url);
  }

  addLogs(data: any) {
    const logData = new FormData();

    logData.append('name', data.name);
    logData.append('date', data.date);
    logData.append('busId', data.busId);
    logData.append('partName', data.partName);
    logData.append('partReturn', data.partReturn);
    logData.append('partIssue', data.partIssue);

    this.http.post<any>(this.url, logData).subscribe({
      next: (response) => {
        this.openSnackbar(response.message, true);
      },
      error: (err) => {
        if (err.error.message.includes('duplicate')) {
          this.errorMessage = 'Duplicate Bus ID';
          this.openSnackbar();
        }
      },
    });
  }

  deleteLog(busId: any) {
    let body = new HttpParams({
      fromObject: {
        busId: busId,
      },
    });
    return this.http.delete<any>(this.url, { body });
  }

  openSnackbar(message?: string, creationLog: boolean = false) {
    this._snackBar.open(message ? message : this.errorMessage, 'Dismiss');
  }
}
