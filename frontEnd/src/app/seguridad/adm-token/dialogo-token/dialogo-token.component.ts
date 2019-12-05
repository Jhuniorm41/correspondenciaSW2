import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenService } from '../../../core/services/token.service';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { NotificacionService } from '../../../core/notifications/shared/notificacion.service';

@Component({
  selector: 'app-dialogo-token',
  templateUrl: './dialogo-token.component.html',
  styleUrls: ['./dialogo-token.component.css'],
  providers: [TokenService, DatePipe]
})
export class DialogoTokenComponent implements OnInit {
  public form: FormGroup;
    currentDate = new Date();
    day = this.currentDate.getDate();
    month = this.currentDate.getMonth();
    year = this.currentDate.getFullYear();
    error: String;
    fechaFin = '';
    minDate = new Date(this.year, this.month, this.day);
    maxDate = new Date(this.year + 1, this.month, this.day);

    constructor(private tokenService: TokenService, private formBuilder: FormBuilder, private notificacion: NotificacionService,
        private dialogRef: MatDialogRef<DialogoTokenComponent>, private datepipe: DatePipe,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }


    getDateFin(date: MatDatepickerInputEvent<Date>) {
            this.fechaFin = this.datepipe.transform(date.value.toDateString(), 'dd/MM/yyyy 00:00:00');
    }

    ngOnInit() {
        this.form = this.formBuilder.group(
        {
            id: [this.data.id],
            usuario: [this.data.usuario, [Validators.required]],
            nombre: [this.data.nombre, [Validators.required]],
            apellido: [this.data.apellido, [Validators.required]],
            email: [this.data.email, [Validators.required]],
            telefono: [this.data.telefono, [Validators.required]],
            password: [this.data.password, [Validators.required]],
            rol: [this.data.rol, [Validators.required]],
            estado: [this.data.estado],
            fechaRegistro: [this.data.fechaRegistro],
            usuarioAlta: [this.data.usuarioAlta],
          }
        );
    }
    close(): void {
        this.dialogRef.close(null);
      }
    onSubmit() {
        if (this.fechaFin !== '') {
            this.tokenService.addToken(this.form.value, this.fechaFin).subscribe(user => {
            this.fechaFin = '';
            this.notificacion.success('Se generó correctamente el token para el usuario: ' + this.data.usuario);
            this.dialogRef.close(user);
            });
        } else {
         return this.notificacion.warning('Por favor seleccioné una fecha.');
        }
      }

}
