import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Company} from '../models/company';
import { DataSourceParametroConexion } from '../models/dataSourceParametroConexionDto';
import { ParametroConexion } from '../models/parameterConexion';


@Injectable()
export class CompanyService {
  companyList: Company[];

  private readonly companyUrl = environment.apiUrl + '/company/';
  private readonly dataSourceUrl: string = environment.apiUrl + '/dataSource/';

  constructor(private http: HttpClient) {
  }

  public getCompany(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companyUrl);
  }

  public getCompanyPrefix(): Observable<string[]> {
    return this.http.get<string[]>(this.companyUrl + 'prefix/');
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

  getAllCompanys() {
    return this.companyList;
  }

  deleteCompany(company: Company) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.put<Company>(this.companyUrl + 'delete/', JSON.stringify(company), httpOptions);
  }

  getCompanyid(): Observable<Company> {
    return this.http.get<Company>(this.companyUrl + 'get/');
  }

  getDatasource(company: Company): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post<any>(this.dataSourceUrl, JSON.stringify(company), httpOptions);
  }

  getEnumType(): Observable<any> {
    return this.http.get<any>(this.dataSourceUrl + 'enumType/');
  }

  addDataSource(dataSource: DataSourceParametroConexion): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post<any>(this.dataSourceUrl + 'create/', JSON.stringify(dataSource), httpOptions);
  }

  editDataSource(dataSource: DataSourceParametroConexion): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.put<any>(this.dataSourceUrl + 'update/', JSON.stringify(dataSource), httpOptions);
  }
  deleteParametroConexion(parametroConexion: ParametroConexion): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post<any>(this.dataSourceUrl + 'parametroConexion/delete', JSON.stringify(parametroConexion), httpOptions);
  }

  listarAsignaciones(userId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.get<any>(this.companyUrl + 'list/' + userId, httpOptions);
  }

  asignacion(userId: number, listaAsignados: Number[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post<any>(this.companyUrl + 'asign/' + userId, JSON.stringify(listaAsignados), httpOptions);
  }
}
