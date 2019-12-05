import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Resource } from '../models/resource';
import { Roles } from '../models/rol';
import { environment } from '../../../environments/environment';


@Injectable()
export class ResourceService {
    resourceList: Resource[];

    private readonly recursoUrl = environment.apiUrl + '/resource/';
    private readonly rolesUrl = environment.apiUrl + '/rol/';
    constructor(private http: HttpClient) {
    }

    public getRoles(): Observable<Roles[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        return this.http.get<Roles[]>(this.rolesUrl + 'avalaible/', httpOptions);
    }

    public getResource(): Observable<Resource[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };

        return this.http.get<Resource[]>(this.recursoUrl, httpOptions);
    }

    addResource(resource: Resource, rol: Roles) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        return this.http.post<Resource>(this.recursoUrl + 'create/', JSON.stringify({recurso: resource, role : rol}), httpOptions);
    }

    editResource(resource: Resource): Observable<Resource> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
        return this.http.put<Resource>(this.recursoUrl + 'update/', JSON.stringify(resource), httpOptions);
    }
    getAllResource() {
        return this.resourceList;
    }
    getResourcePadre(): Observable<Resource[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'usernameFilter': 'true',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        return this.http.get<Resource[]>(this.recursoUrl + 'fatherResource/', httpOptions);
    }

}
