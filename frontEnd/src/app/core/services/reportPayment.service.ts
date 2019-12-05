import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ReportPago} from '../models/ReportPago';
import { environment } from '../../../environments/environment';

@Injectable()
export class ReportPaymentService {

    reportPaymentList: ReportPago[];
    private readonly reportUrl: string = environment.apiUrl + '/reportPayment/';

    constructor(private http: HttpClient) {
    }

    public getReportePaymentSearch( search: string): Observable<ReportPago[]> {
        const params = new HttpParams()
            .set('search', search);
        return this.http.get<ReportPago[]>(this.reportUrl + 'search', {params});
    }

    public getReportPaymentDate(fechaInicio: string, fechaFin: string): Observable<ReportPago[]> {
        const params = new HttpParams()
            .set('fechaInicio', fechaInicio)
            .set('fechaFin', fechaFin);
        return this.http.get<ReportPago[]>(this.reportUrl + 'searchDate', {params});
    }

    // tslint:disable-next-line:max-line-length
    // public getReportPaymentFull(fechaInicio: string, fechaFin: string, search: string, page: number, size: number): Observable<any> {
    //     const params = new HttpParams()
    //         .set('fechaInicio', fechaInicio)
    //         .set('fechaFin', fechaFin)
    //         .set('search', search);
    //     return this.http.get<any>(this.reportUrl + 'searchFull/' + page + '/' + size, {params});
    // }
    public getReportPaymentFull(fechaInicio: string, fechaFin: string, search: string, page: number, size: number): Observable<any> {
        const params = new HttpParams()
            .set('fechaInicio', fechaInicio)
            .set('fechaFin', fechaFin)
            .set('search', search);
            return this.http.get<any>(this.reportUrl + 'searchFull/' + page + '/' + size, {params: params});
    }

}
