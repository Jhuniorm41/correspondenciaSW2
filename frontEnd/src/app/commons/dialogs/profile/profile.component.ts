import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificacionService } from '../../../core/notifications/shared/notificacion.service';
import { UserPassword } from '../../../core/models/password';
import { MustMatch } from './validation/confirmPassword';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  public passwordForm: FormGroup;
  submitted = false;
  cambioContrasenia = false;
  password: UserPassword;

  public form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProfileComponent>,
    private notificacion: NotificacionService,
    private userService: ProfileService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        usuario: [{ value: this.data.usuario, disabled: true }],
        nombre: [{ value: this.data.nombre, disabled: true }],
        apellido: [{ value: this.data.apellido, disabled: true }],
        telefono: [{ value: this.data.telefono, disabled: true }, [Validators.required, Validators.pattern('^([0-9]){8}$')]],
        // tslint:disable-next-line:max-line-length
        email: [{ value: this.data.email, disabled: true }, [Validators.required, Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z0-9]+\\.)+[a-zA-Z]{2,}))$')]],
        password: [{ value: '******', disabled: true }],
        empresa: [{ value: this.data.empresa, disabled: true }],
        rol: [{ value: this.data.rol, disabled: true }],
      });
    this.passwordForm = this.formBuilder.group({
      presentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }
  close(): void {
    this.dialogRef.close(null);
  }

  cambiarContrasenia() {
    this.cambioContrasenia = !this.cambioContrasenia;
  }
  get f() {
    return this.passwordForm.controls;
  }

  guardar() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    this.userService.changePassword(this.passwordForm.value).subscribe(date => {
      // @ts-ignore
      if (date.status === 'OK') {
        // @ts-ignore
        this.notificacion.success(date.message);
        this.dialogRef.close(date);
      } else {
        // @ts-ignore
        this.notificacion.warning(date.message);
      }
    }, err => {
        this.notificacion.failed(err.message);
      }
    );

  }
}
