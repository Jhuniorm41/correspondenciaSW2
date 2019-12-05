import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Profile} from '../models/Profile';
import {UserPassword} from '../models/password';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProfileService {

    private readonly userUrl = environment.apiUrl + '/user/';

    constructor(private http: HttpClient) {
    }

    getUser(): Observable<Profile> {
        const httpOptions = {
            headers: new HttpHeaders({
                'usernameFilter': 'true',
            })
        };
        return this.http.get<Profile>(this.userUrl + 'profile/', httpOptions);
    }


    changePassword(passwords: UserPassword): Observable<string> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'usernameFilter': 'true',
            })
        };
        return this.http.post<string>(this.userUrl + 'pass/', JSON.stringify(passwords), httpOptions);
    }

    updateUser(email: string, telefono: string): Observable<any> {

        const headers = new HttpHeaders({
            'usernameFilter': 'true',
        });

        const params = new HttpParams()
            .set('email', email)
            .set('telefono', telefono);
        return this.http.get<any>(this.userUrl + 'update/', {headers, params});
    }

}
