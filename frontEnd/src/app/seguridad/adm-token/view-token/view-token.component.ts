import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificacionService } from '../../../core/notifications/shared/notificacion.service';

@Component({
  selector: 'app-view-token',
  templateUrl: './view-token.component.html',
  styleUrls: ['./view-token.component.css']
})
export class ViewTokenComponent implements OnInit {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<ViewTokenComponent>,
      private notificacion: NotificacionService,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
      this.form = this.formBuilder.group(
      {
          id: [this.data.usuario.id],
          usuario: [this.data.usuario.usuario],
          nombre: [this.data.usuario.nombre],
          apellido: [this.data.usuario.apellido],
          token: [this.data.token],
        }
      );
  }
  close(): void {
      this.dialogRef.close(null);
    }
    copyInputMessage(inputElement) {
      inputElement.select();
      document.execCommand('copy');
      inputElement.setSelectionRange(0, 0);
      this.notificacion.success('Se copio en el portapapeles el Token.');
    }
}
