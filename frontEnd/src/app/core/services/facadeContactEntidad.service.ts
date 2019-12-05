import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../models/contacts';
import { Entity } from '../models/entidad';
import { environment } from '../../../environments/environment';

@Injectable()
export class FacadeContactEntidadService {

    contactoList: Contact[] = [];
    entidadList: Entity[] = [];
    private readonly contactoUrl: string = environment.apiUrl + '/contact/';
    private readonly entidadUrl: string = environment.apiUrl + '/entity/';
    constructor(private http: HttpClient) {
    }

    getContact(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.contactoUrl);
    }
    getEntidad(): Observable<Entity[]> {
        return this.http.get<Entity[]>(this.entidadUrl);
    }

    addEntidad(entidad: Entity) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
        return this.http.post<Entity>(this.entidadUrl + 'create/', JSON.stringify(entidad), httpOptions);
    }

    editEntidad(entidad: Entity): Observable<Entity> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
        return this.http.put<Entity>(this.entidadUrl + 'update/', JSON.stringify(entidad), httpOptions);
    }
}
