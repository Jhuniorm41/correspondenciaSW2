import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Customers} from '../models/customer';
import { environment } from '../../../environments/environment';


@Injectable()
export class ReporteClienteService {

    private readonly customerUrl = environment.apiUrl + '/customer/';

    constructor(private http: HttpClient) {
    }

    getCustomer(search: string, page: number, size: number): Observable<any> {
        const params = new HttpParams()
        .set('search', search);
        return this.http.get<any>(this.customerUrl + 'search/' + page + '/' + size, {params: params});

    }
}
