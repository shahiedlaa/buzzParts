import {
  Component,
  computed,
  inject,
  Resource,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/materials/material.module';
import { Router } from '@angular/router';
import { LogsService } from '../shared/services/logs-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-logs',
  imports: [MaterialModule, CommonModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss',
})
export class LogsComponent {
  router = inject(Router);
  logsService = inject(LogsService);

  public logsDataSource!: MatTableDataSource<any>;

  public logsData!: Resource<any>;

  public index: number = 0;
  public length!: number;

  public loaded = computed(
    () => this.logsData.value() || this.logsData.reload()
  );

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
    this.getLogsFromService({
      index: 0,
      size: 10,
    });
  }

  getLogsFromService(pageParams?: any) {
    this.logsData = this.logsService.getLogs(pageParams);
    this.logsDataSource.data = [];
    setTimeout(() => {
      let data = this.logsData.value().articles.data;
      let totalDocuments = this.logsData.value().articles.metadata.totalCount;
      this.logsDataSource.data = data;
      this.length = totalDocuments;
    }, 1000);
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

  pageChange(event: PageEvent) {
    let pageParams = {
      index: event.pageIndex,
      size: event.pageSize,
    };
    this.index = event.pageIndex;
    this.getLogsFromService(pageParams);
  }
}
