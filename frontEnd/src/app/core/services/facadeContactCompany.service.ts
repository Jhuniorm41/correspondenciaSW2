import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../models/contacts';
import { Company } from '../models/company';
import { environment } from '../../../environments/environment';

@Injectable()
export class FacadeContactCompanyService {

    contactoList: Contact[] = [];
    companyList: Company[] = [];
    private readonly contactoUrl: string = environment.apiUrl + '/contact/';
    private readonly companyUrl: string = environment.apiUrl + '/company/';
    constructor(private http: HttpClient) {
    }

    getContact(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.contactoUrl);
    }
    getCompany(): Observable<Company[]> {
        return this.http.get<Company[]>(this.companyUrl);
    }

    addCompany(company: Company) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
        return this.http.post<Company>(this.companyUrl + 'create/', JSON.stringify(company), httpOptions);
    }
    editCompany(company: Company): Observable<Company> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
        return this.http.put<Company>(this.companyUrl + 'update/', JSON.stringify(company), httpOptions);
    }
    getAllResource() {
        return this.companyList;
    }
}
