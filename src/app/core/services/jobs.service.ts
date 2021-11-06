import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({
    providedIn: 'root'
})
export class JobsService {
    private readonly _url = `${environment.authenticationServerUrl}/job/`;
    constructor(private http: HttpClient) { }

    getAll(gameId: string): Observable<Job[]> {
        return this.http.get<Job[]>(this._url + `all?gameId=${gameId}`);
    }

    getAllTypes(gameId: string): Observable<Job[]> {
        return this.http.get<Job[]>(this._url + `type/all?gameId=${gameId}`);
    }

    get(id: number): Observable<Job> {
        return this.http.get<Job>(this._url + id);
    }

    save(job: Job): Observable<Job> {
        if (job.id) {
            return this.http.put<Job>(this._url + job.id, job);
        } else {
            return this.http.post<Job>(this._url, job);
        }
    }
}
