import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Personal } from '../../models/Api-model/personal';
import { Correspondencia } from '../../models/Api-model/correspondencia';


@Injectable()
export class ApiService {

    constructor(private http: HttpClient) {
    }
    // personal
    listAllPersonal(): Observable<any[]> {
        return this.http.get<any[]>(environment.apiUrl + 'personal');
    }
    createPersonal(personal: Personal): Observable<Personal> {
        return this.http.post<Personal>(environment.apiUrl + 'personal', personal);
    }
    editPersonal(personal: Personal): Observable<Personal> {
        return this.http.put<Personal>(environment.apiUrl + 'personal/' + personal.id, personal);
    }
    deletePersonal(personal: Personal): Observable<Personal> {
        return this.http.delete<Personal>(environment.apiUrl + 'personal/' + personal.id);
    }
    // correspondencia
    listAllCorrespondencia(): Observable<any[]> {
        return this.http.get<any[]>(environment.apiUrl + 'correspondencia');
    }
    editCorrespondencia(objeto): Observable<any> {
        return this.http.put<Personal>(environment.apiUrl + 'correspondencia/' + objeto.id, objeto);
    }
    deleteCorrespondencia(objeto): Observable<any> {
        return this.http.delete<any>(environment.apiUrl + 'correspondencia/' + objeto.id);
    }

    // empresas
    listAllEmpresa(): Observable<any[]> {
        return this.http.get<any[]>(environment.apiUrl + 'empresa');
    }
    createEmpresa(objeto): Observable<any> {
        return this.http.post<any>(environment.apiUrl + 'empresa', objeto);
    }
    editEmpresa(objeto): Observable<any> {
        return this.http.put<any>(environment.apiUrl + 'empresa/' + objeto.id, objeto);
    }
    deleteEmpresa(objeto): Observable<Personal> {
        return this.http.delete<any>(environment.apiUrl + 'empresa/' + objeto.id);
    }
    // prioridad
    listAllPrioridad(): Observable<any[]> {
        return this.http.get<any[]>(environment.apiUrl + 'prioridad');
    }
    createPrioridad(objeto): Observable<any> {
        return this.http.post<Personal>(environment.apiUrl + 'prioridad', objeto);
    }
    editPrioridad(objeto): Observable<any> {
        return this.http.put<Personal>(environment.apiUrl + 'prioridad/' + objeto.id, objeto);
    }
    deletePrioridad(objeto): Observable<any> {
        return this.http.delete<any>(environment.apiUrl + 'prioridad/' + objeto.id);
    }
}
