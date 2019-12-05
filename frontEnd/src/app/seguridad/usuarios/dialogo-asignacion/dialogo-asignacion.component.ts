import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { CompanyService } from '../../../core/services/company.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificacionService } from '../../../core/notifications/shared/notificacion.service';
import { Company } from '../../../core/models/company';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dialogo-asignacion',
  templateUrl: './dialogo-asignacion.component.html',
  styleUrls: ['./dialogo-asignacion.component.css'],
  providers: [CompanyService]
})
export class DialogoAsignacionComponent implements OnInit {
  @Input() operacion: string;
  public error: string;
  public listAsignados: Company[] = [];
  public listNoAsignados: Company[] = [];
  public enable = false;

  constructor(private companyService: CompanyService,
    private dialogRef: MatDialogRef<DialogoAsignacionComponent>,
    private notificacion: NotificacionService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.listarAsignaciones();
  }

  listarAsignaciones() {
    this.companyService.listarAsignaciones(this.data.id).subscribe(respuesta => {
      this.listAsignados = respuesta.values.listAssigned;
      this.listNoAsignados = respuesta.values.listNotAssigned;
      this.enable = true;
    },
    error => {
      this.enable = true;
      this.notificacion.failed(error.error.message);
    });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  onSaveClick() {
    const listaAsignados: number[] = [];
    this.listAsignados.forEach( lista => listaAsignados.push(lista.id));
    this.companyService.asignacion(this.data.id, listaAsignados).subscribe(res => {
      this.dialogRef.close();
    this.notificacion.success('Se asignó las empresas para el usuario: ' + this.data.nombre);
    }, error => {
      this.notificacion.failed(error.error.message);
    });
  }

  onAddClick(i: number) {
    transferArrayItem(this.listAsignados, this.listNoAsignados, i, this.listNoAsignados.length);
  }

  onRemoveClick(i: number) {
    transferArrayItem(this.listNoAsignados, this.listAsignados, i, this.listAsignados.length);
  }

  cancel() {
    this.dialogRef.close();
  }
}
