import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MaterialModule } from '../../shared/materials/material.module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LogsService } from '../../shared/services/logs-service';

@Component({
  selector: 'app-create-logs',
  providers: [provideNativeDateAdapter()],
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-logs.component.html',
  styleUrl: './create-logs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateLogsComponent {
  constructor(private logsService: LogsService) {}

  public createLogForm!: FormGroup;
  public dateTime!: Date;
  public partName = ['OBC', 'DDU'];

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.createLogForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date: new FormControl(''),
      busId: new FormControl('', [Validators.required]),
      partName: new FormControl('', [Validators.required]),
      partIssue: new FormControl('', [Validators.required]),
      partReturn: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (!this.createLogForm.valid) return;
    this.createLogForm.value['date'] = this.dateTime.toISOString();
    this.logsService.addLogs({ ...this.createLogForm.value });
  }
}
