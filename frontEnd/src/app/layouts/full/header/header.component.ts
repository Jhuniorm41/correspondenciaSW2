import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {ConfirmDialogComponent} from '../../../commons/dialogs/confirm-dialog/confirm-dialog.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import { ProfileService } from '../../../core/services/profile.service';
import { ProfileComponent } from '../../../commons/dialogs/profile/profile.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
  providers: [ProfileService]
})
export class AppHeaderComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  profile: any;
  usuario: string;
  username: any;
  // This is for Notifications
  constructor(private router: Router,
              public dialog: MatDialog,
              private matDialog: MatDialog,
              private userService: ProfileService
  ) {}
  notifications: Object[] = [
    {
      round: 'round-danger',
      icon: 'ti-link',
      title: 'Launch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      round: 'round-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      round: 'round-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      round: 'round-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  ngOnInit(): void {
   // this.getUsername();
  }
  logout() {
    const logoutConfirm = this.matDialog.open(ConfirmDialogComponent, {
      panelClass: ['zero-padding'],
      // tslint:disable-next-line:max-line-length
      data: {textContent: '¿Está seguro que desea cerrar sesión?', btnConfirm: 'Confirmar', btnCancel: 'Cancelar', headerText: 'CERRAR SESIÓN'}
    });

    logoutConfirm.afterClosed().subscribe(result => {
      if (result) {
        sessionStorage.clear();
        // window.location.reload();
        this.router.navigate(['authentication/login']);
      }
    });
  }
  getUsername() {
    this.userService.getUser().subscribe(user => {
        this.profile = user;
        this.usuario = this.profile.nombre + ' ' + this.profile.apellido;
        this.username = this.profile.usuario;
    });
}

getProfile() {
  this.userService.getUser().subscribe(result => {
       this.dialog.open(ProfileComponent, {
        maxHeight: (window.innerHeight - 50) + 'px',
        width: '50%',
        data: result
      });
    });
  }
}
