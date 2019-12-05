import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Binnacle} from '../models/binnacle';
import { environment } from '../../../environments/environment';


@Injectable()
export class BinnacleService {
    binnacleList: Binnacle[];

    private readonly binnacleUrl = environment.apiUrl + '/binnacle/';

    constructor(private http: HttpClient) {
    }

    public getBinnacle(): Observable<Binnacle[]> {
        return this.http.get<Binnacle[]>(this.binnacleUrl);
    }

    getAllResource() {
        return this.binnacleList;
    }
    // tslint:disable-next-line:max-line-length
    public getReportBinnacleFull(fechaInicio: string, fechaFin: string, accion: string, page: number, size: number): Observable<any> {
        const params = new HttpParams()
            .set('fechaInicio', fechaInicio)
            .set('fechaFin', fechaFin)
            .set('accion', accion);
        return this.http.get<any>(this.binnacleUrl + page + '/' + size, {params: params});
    }
}
