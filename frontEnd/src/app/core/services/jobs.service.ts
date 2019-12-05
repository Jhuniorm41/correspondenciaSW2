import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class JobsService {

    private readonly jobUrl: string = environment.apiUrl + '/scheduler/';

    constructor(private http: HttpClient) {}

    getJobs(): Observable<any> {
        return this.http.get(this.jobUrl);
    }

    start(groupName, jobName): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
        return this.http.post(this.jobUrl + 'start/' + + groupName + '/' + jobName , httpOptions);
    }

    pause(groupName, jobName): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
        return this.http.get(this.jobUrl + 'pause/' + groupName + '/' + jobName , httpOptions);
    }

    resume(groupName, jobName): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
        return this.http.put(this.jobUrl + 'resume/' +  groupName + '/' + jobName  , httpOptions);
    }

    editJobs(groupName, jobName, cronExpression): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.put(this.jobUrl + 'update/' + groupName + '/' + jobName + '?cronExpression=' + cronExpression , httpOptions);
    }

}
