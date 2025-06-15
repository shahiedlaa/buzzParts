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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-logs',
  providers: [provideNativeDateAdapter()],
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-logs.component.html',
  styleUrl: './create-logs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateLogsComponent {
  constructor(
    private logsService: LogsService,
    private route: ActivatedRoute
  ) {}

  public createLogForm!: FormGroup;
  public busID: any;
  public dateTime!: Date;
  public partName: string[] = ['OBC', 'DDU'];
  public editMode: boolean = false;
  private formData: any = {};

  ngOnInit() {
    this.initForm();
    this.route.paramMap.subscribe((response: any) => {
      if (response.has('busId')) {
        this.editMode = true;
        this.busID = response.params.busId;
        this.formData = this.route.snapshot.data['data'].body;
        this.initForm(this.formData);
      }
    });
  }

  initForm(formData?: any) {
    this.dateTime = new Date(formData?.date);
    this.createLogForm = new FormGroup({
      name: new FormControl(formData ? formData.name : '', [
        Validators.required,
      ]),
      date: new FormControl(''),
      busId: new FormControl(
        {
          value: formData ? formData.busId : '',
          disabled: this.editMode ? true : null,
        },
        [Validators.required]
      ),
      partName: new FormControl(formData ? formData.partName : '', [
        Validators.required,
      ]),
      partIssue: new FormControl(formData ? formData.partIssue : '', [
        Validators.required,
      ]),
      partReturn: new FormControl(formData ? formData.partIssue : '', [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    if (!this.createLogForm.valid) return;
    this.createLogForm.getRawValue().date = this.dateTime.toISOString();
    const rawFormValue = this.createLogForm.getRawValue();
    rawFormValue.date = this.dateTime.toISOString();

    if (this.editMode) {
      this.logsService.editLog({ ...rawFormValue });
    } else {
      this.logsService.addLogs({ ...this.createLogForm.value });
    }
  }
}
