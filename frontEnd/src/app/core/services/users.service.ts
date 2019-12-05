import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/users';
import { Roles } from '../models/rol';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsersService {

    private readonly userUrl = environment.apiUrl + '/users/';
    private readonly rolUrl: string = environment.apiUrl + '/rol/';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.userUrl);
    }

    getUsersPayment(): Observable<User[]> {
        return this.http.get<User[]>(this.userUrl + 'payment/');
    }
    getRol(): Observable<Roles[]> {
        return this.http.get<Roles[]>(this.rolUrl);
    }

    createUser(users: User, companyId: number): Observable<User> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
        return this.http.post<User>(this.userUrl + 'create/' + companyId + '/', JSON.stringify(users), httpOptions);
    }

    editUser(users: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
        return this.http.put<User>(this.userUrl + 'edit/', JSON.stringify(users), httpOptions);
    }

    deleteUser(users: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };

        return this.http.put<User>(this.userUrl + 'delete/', JSON.stringify(users), httpOptions);
    }

}
