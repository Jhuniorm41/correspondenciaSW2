import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private tokenSubject: BehaviorSubject<string>;
    public token: Observable<string>;


    private readonly urlHttp = environment.apiUrl;

    constructor(private http: HttpClient) {
        this.tokenSubject = new BehaviorSubject<string>(JSON.parse(sessionStorage.getItem('token')));
        this.token = this.tokenSubject.asObservable();
    }

    public get tokenValue(): string {
        return this.tokenSubject.value;
    }

    login(empresa: string, usuario: string, password: string) {
        const datos = {usuario: usuario, password: password, prefijo: empresa};
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        return this.http.post<any>(this.urlHttp + '/login/', JSON.stringify(datos), httpOptions)
            .pipe(map(user => {
                if (user && user.JWT) {
                    sessionStorage.setItem('token', JSON.stringify(user.JWT));
                    this.tokenSubject.next(user.JWT);
                }
                return user;
            }));
    }

    logout(): Observable<any> {
        return this.http.get<any>(this.urlHttp + '/logout/')
            .pipe(map(logout => {
                if (logout.code === '0000') {
                    sessionStorage.removeItem('token');
                    this.tokenSubject.next(null);
                    return true;
                }
                return false;
            }));
    }
}
