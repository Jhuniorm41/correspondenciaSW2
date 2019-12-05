import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Jobs } from '../../../core/models/job';
import { JobsService } from '../../../core/services/jobs.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificacionService } from '../../../core/notifications/shared/notificacion.service';

@Component({
  selector: 'app-jobs-dialogo',
  templateUrl: './jobs-dialogo.component.html',
  styleUrls: ['./jobs-dialogo.component.css'],
  providers: [JobsService]
})
export class JobsDialogoComponent implements OnInit {

  public jobForm: FormGroup;
  cronExpression: 'value';
  job: Jobs;

  constructor(private jobsService: JobsService, private formBuilder: FormBuilder, private notificacion: NotificacionService,
              private dialogRef: MatDialogRef<JobsDialogoComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.job = data;
  }


  ngOnInit() {
      this.jobForm = this.formBuilder.group({
          jobName: [this.data.jobName],
          cronExpression: [this.data.cronExpression, [Validators.required]],
          description: [this.data.description]
      });
  }

  onNoClick(): void {

      this.dialogRef.close();
  }

  onSubmit() {
      if (isNaN(this.data.jobName)) {
          this.jobsService.editJobs(this.job.groupName, this.job.jobName, this.jobForm.value.cronExpression).subscribe(job => {
              this.notificacion.success('Se modificó correctamente el Job: ' + this.jobForm.value.jobName);
              this.dialogRef.close(job);
          });
      }

  }
  close() {
    this.dialogRef.close(null);
  }

}
