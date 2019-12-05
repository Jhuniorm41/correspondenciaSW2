/**
 * MC4
 * Santa Cruz - Bolivia
 * project:
 * package:
 * date:    30-01-19
 * author:  fmontero
 **/
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Authentication} from '../../shared/authentication';
import {MatDialog} from '@angular/material';
import {CompanyService} from '../../../core/services/company.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.sass']
})
export class FormLoginComponent implements OnInit, OnChanges {

  loginForm = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  @Output() submitted = new EventEmitter<Authentication>();

  @Input() public error: string;
  @Input() public isLoad: boolean;

  public prefijos: string[];

  @Input() set disabled(isDisabled: boolean) {
    if (isDisabled) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  }

  constructor(private matDialog: MatDialog, private companyService: CompanyService) {

  }

  ngOnInit() {
  }

  loginFormSubmit() {
    const value: Authentication = this.loginForm.value;
    if (this.loginForm.valid) {
      this.submitted.emit(value);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.error) {
      this.loginForm.controls['password'].setValue('');
    }
  }

}
