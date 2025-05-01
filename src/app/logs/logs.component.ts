import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/materials/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { LogsService } from '../shared/services/logs-service';
import { MatTableDataSource } from '@angular/material/table';
import { logsMockData } from './logs.model';

@Component({
  selector: 'app-logs',
  imports: [MaterialModule, CommonModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss',
})
export class LogsComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logsService: LogsService
  ) {}

  public logsDataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'name',
    'date',
    'busId',
    'partName',
    'partReturn',
    'partIssue',
    'action',
  ];

  ngOnInit() {
    this.logsDataSource = new MatTableDataSource();
    this.getLogsFromService();
  }

  getLogsFromService() {
    this.logsService.getLogsFromService().subscribe({
      next: (response) => {
        if (response) {
          this.logsDataSource.data = response.body;
        }
      },
      error: (error) => {
        this.logsService.openSnackbar(error);
      },
    });
  }

  editLog(event: any) {
    this.router.navigate([`/create-logs/${event.busId}`]);
  }

  deleteLog(event: any) {
    let busId = event.busId;

    this.logsService.deleteLog(busId).subscribe({
      next: (response) => {
        if (response) {
          this.logsService.openSnackbar(response.message);
          this.getLogsFromService();
        }
      },
      error: (error) => {
        this.logsService.openSnackbar(error);
      },
    });
  }
}
