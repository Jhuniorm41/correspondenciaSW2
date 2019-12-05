import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/users';

@Injectable()
export class TokenService {
    // resourceList: Resource[];

    private readonly tokenUrl = environment.apiUrl + '/token/';
    constructor(private http: HttpClient) {
    }
    addToken(user: User, fechaFin: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        return this.http.post<any>(this.tokenUrl + 'create/', JSON.stringify({usuario: user, fechaExpiracion: fechaFin}), httpOptions);
    }

    viewToken(usuario: User): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
        return this.http.post<any>(this.tokenUrl + 'get/', JSON.stringify(usuario), httpOptions);
    }
    deleteToken(usuario: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        return this.http.post<any>(this.tokenUrl + 'delete/', JSON.stringify(usuario), httpOptions);
    }
}
