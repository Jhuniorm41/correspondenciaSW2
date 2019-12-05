import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {MenuList} from '../models/menu';
import {environment} from '../../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class MenuService {
  private resources: any;

  menu: MenuList[];
  private readonly reportUrl: string = environment.apiUrl;

  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) {
    //   this.resources = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('data')).token);
  }

  getTokenData() {
    this.resources = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')));
    return this.resources;
  }

  public getResources(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'usernameFilter': 'true',
      })
    };
    return this.http.get(this.reportUrl + '/resource/menu/', httpOptions);
  }

  getMenu() {
    this.getTokenData();
    let items: any[] = [];
    this.resources.resources.sort((left, rigth): number => {
      if (left.orden < rigth.orden) {
        return -1;
      }
      if (left.orden > rigth.orden) {
        return 1;
      }
      return 0;
    });

    this.resources.resources.forEach(item => {
      if (item.views.length > 0) {
        // ordenacion de los recursos hijos del recurso actual
        // item.views.sort((left, rigth): number => {
        //   if (left.orden < rigth.orden) {
        //     return -1;
        //   }
        //   if (left.orden > rigth.orden) {
        //     return 1;
        //   }
        //   return 0;
        // });
        // crear un item separador con el recurso padre actual
        const menu = {parent: '', state: item.path, name: item.title.toLocaleUpperCase(), type: 'sub', icon: item.icon, children: []};
        item.views.forEach(subitem => {
          const itemlink = {
            parent: item.path,
            state: subitem.path,
            name: subitem.title,
            type: 'link',
            icon: subitem.icon,
            enable: true
          };
          menu.children.push(itemlink);
        });

        items.push(menu);
      }
    });
    return items;
  }
}
