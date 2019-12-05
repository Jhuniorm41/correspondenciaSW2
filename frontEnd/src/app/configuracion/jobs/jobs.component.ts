import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Jobs } from '../../core/models/job';
import { JobsService } from '../../core/services/jobs.service';
import { NotificacionService } from '../../core/notifications/shared/notificacion.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../commons/dialogs/confirm-dialog/confirm-dialog.component';
import { JobsDialogoComponent } from './jobs-dialogo/jobs-dialogo.component';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  providers: [JobsService]
})

export class JobsComponent implements OnInit {
  @ViewChild('table') currencyTable: any;
  jobs: Jobs[] = [];
  isPopupOpened = true;
  submitted = false;

  constructor(private jobsService: JobsService, private notificacion: NotificacionService, public dialog: MatDialog) { }

  ngOnInit() {
    this.currencyTable.messages = {
      emptyMessage: 'Ningún registro para mostrar',
      selectedMessage: 'seleccionados',
      totalMessage: 'en total'
    };
    this.listar();
  }
  listar() {
    this.jobsService.getJobs().subscribe(j => {
      if (j !== null) {
        this.jobs = j.data;
      } else {
        this.jobs = [];
      }
    });
  }

  startJob(jobs: Jobs) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: ['zero-padding'],
      // tslint:disable-next-line:max-line-length
      data: { textContent: '¿Estas seguro que quieres ejecutar ahora el job: "' + jobs.jobName + '" en este momento?', headerText: 'Ejecutar Job' }
    });
    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        this.jobsService.start(jobs.groupName, jobs.jobName).subscribe(result => {
          const index = this.jobs.indexOf(jobs);
            this.jobs[index].jobStatus = 'SCHEDULED';
            this.notificacion.success('El job: "' + jobs.jobName + '" se ejecutó correctamente.');
        }, err => {
          this.notificacion.failed(err.error.errorMessage);
        });
      }
    });

  }

  pauseJob(jobs: Jobs) {
    if (jobs.jobStatus === 'PAUSED') {
      return this.notificacion.warning('El job: "' + jobs.jobName + '" ya se encuentra pausado.');
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: ['zero-padding'],
      // tslint:disable-next-line:max-line-length
      data: { textContent: '¿Estas seguro que quieres pausar el job: "' + jobs.jobName + '"?', headerText: 'Pausar Job' }
    });
    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        this.jobsService.pause(jobs.groupName, jobs.jobName).subscribe(result => {
          const index = this.jobs.indexOf(jobs);
            this.jobs[index].jobStatus = 'PAUSED';
            this.notificacion.success('El job: "' + jobs.jobName + '" se pausó correctamente.');
        }, err => {
          this.notificacion.failed(err.error.errorMessage);
        });
      }
    });
  }

  resumeJob(jobs: Jobs) {
    if (jobs.jobStatus === 'PAUSED') {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        panelClass: ['zero-padding'],
        // tslint:disable-next-line:max-line-length
        data: { textContent: '¿Estas seguro que quieres reanudar el job: "' + jobs.jobName + '"?', headerText: 'Reanuar Job' }
      });
      dialogRef.afterClosed().subscribe(respuesta => {
        if (respuesta) {
          this.jobsService.resume(jobs.groupName, jobs.jobName).subscribe(result => {
            const index = this.jobs.indexOf(jobs);
            if (result.statusCode === 200) {
              this.jobs[index].jobStatus = 'SCHEDULED';
              this.notificacion.success('El job: "' + jobs.jobName + '" se reanudó correctamente.');
            } else {
              this.notificacion.failed('Error no se ha podido Reanudar este Job.');
            }
          });
        }
      });
    } else {
      this.notificacion.warning('Error este Job no se encuentra Detenido.');
    }

  }

  editJob(job: Jobs) {
    if (job.jobStatus === 'SCHEDULED') {
      this.notificacion.warning('Error el job: "' + job.jobName + '" se encuentra en ejecución.');
    } else {
      if (job.jobStatus === 'PAUSED') {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          panelClass: ['zero-padding'],
          data: { textContent: '¿Estas seguro que quieres modificar el job: "' + job.jobName + '"?', headerText: 'Modificar Job' }
        });
        dialogRef.afterClosed().subscribe(respuesta => {
          if (respuesta) {
            // tslint:disable-next-line:no-shadowed-variable
            const dialogRef = this.dialog.open(JobsDialogoComponent, {
              maxHeight: (window.innerHeight - 50) + 'px',
              width: '50%',
              data: job
            });
            // tslint:disable-next-line:no-shadowed-variable
            dialogRef.afterClosed().subscribe(respuesta => {
              if (respuesta !== null) {
                this.listar();
              }
            });
          }
        });
      } else {
        this.notificacion.warning('El Job no se encuentra en estado detenido.');
      }
    }
  }

}
