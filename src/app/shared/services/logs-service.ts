import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  readonly url: any = 'http://localhost:3000/api/logs';
  public errorMessage!: string;
  private _snackBar = inject(MatSnackBar);

  readonly page = signal(0);
  readonly pageSize = signal(10);
  readonly search = signal('');

  readonly pageConfig = computed(() => ({
    page: this.page(),
    pageSize: this.pageSize(),
    search: this.search(),
  }));

  constructor(private http: HttpClient) {}

  logsResource = resource({
    request: () => this.pageConfig(),
    loader: (params) =>
      fetch(
        `${this.url}?index=${params.request.page}&size=${params.request.pageSize}&search=${params.request.search}`
      ).then((res) => res.json()),
  });

  getLogs(pageParams: any) {
    this.page.set(pageParams.index);
    this.search.set(pageParams.search);
    return this.logsResource;
  }

  getLogsByBusIdFromService(busId: any) {
    // let params = new HttpParams({
    //   fromObject: {
    //     busId: busId,
    //   },
    // });
    return this.http.get<any>(this.url + '/edit-logs/' + busId);
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
    let params = new HttpParams({
      fromObject: {
        busId: busId,
      },
    });
    return this.http.delete<any>(this.url, { params });
  }

  openSnackbar(message?: string, creationLog: boolean = false) {
    this._snackBar.open(message ? message : this.errorMessage, 'Dismiss', {
      duration: 3000,
    });
  }
}
