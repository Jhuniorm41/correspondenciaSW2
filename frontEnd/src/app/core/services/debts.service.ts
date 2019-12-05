import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Debts } from '../models/debt';
import { environment } from '../../../environments/environment';
import { Page } from '../utils/paginator/page';

@Injectable()
export class DebtsService {
    private readonly debtsUrl = environment.apiUrl + '/debts/';

    constructor(private http: HttpClient) { }

    getDebt(search: string, page: number, size: number): Observable<any> {
        const params = new HttpParams()
        .set('search', search);
        return this.http.get<any>(this.debtsUrl + 'search/' + page + '/' + size , {params: params});
    }
}
