import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Entity } from '../models/entidad';
import { environment } from '../../../environments/environment';

@Injectable()
export class EntidadService {
    entidadList: Entity[];

    private readonly Url = environment.apiUrl + '/company/';
    constructor(private http: HttpClient) { }

    public getEntitys(): Observable<Entity[]> {
        return this.http.get<Entity[]>(this.Url);
    }
    addEntity(entidad: Entity) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        return this.http.post<Entity>(this.Url + 'create/', JSON.stringify(entidad), httpOptions);
    }
    editEntity(entidad: Entity): Observable<Entity> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
        return this.http.put<Entity>(this.Url + 'update/', JSON.stringify(entidad), httpOptions);
    }
    getAllEntity() {
        return this.entidadList;
    }
    deleteEntity(entidad: Entity) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };

        return this.http.put<Entity>(this.Url + 'delete/', JSON.stringify(entidad), httpOptions);
    }
}
