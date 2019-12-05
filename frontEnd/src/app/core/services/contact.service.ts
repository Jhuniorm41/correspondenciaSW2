import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../models/contacts';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';



@Injectable()
export class ContactService {

    private readonly contactoUrl: string = environment.apiUrl + '/contact/';

    constructor(private http: HttpClient, public snackBar: MatSnackBar) {
    }

    getContact(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.contactoUrl);
    }


    createContact(contact: Contact): Observable<Contact> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };

        return this.http.post<Contact>(this.contactoUrl + 'create/', JSON.stringify(contact), httpOptions);
    }

    editContact(contact: Contact) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
        return this.http.put<Contact>(this.contactoUrl + 'update/', JSON.stringify(contact), httpOptions);
    }

    deleteContact(contact: Contact) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };

        return this.http.put<Contact>(this.contactoUrl + 'delete/', JSON.stringify(contact), httpOptions);
    }
}
