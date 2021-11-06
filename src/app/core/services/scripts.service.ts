import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Script } from '../models/script.model';

@Injectable({
    providedIn: 'root'
})
export class ScriptsService {
    private readonly _url = `${environment.authenticationServerUrl}/scenario/`;
    constructor(private http: HttpClient) { }

    getAll(): Observable<Script[]> {
        return this.http.get<Script[]>(this._url + 'all');
    }

    get(id: string): Observable<Script> {
        return this.http.get<Script>(this._url + id);
    }

    save(script: Script): Observable<string> {
        let HTTPOptions: Object = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            responseType: 'text'
        }

        return this.http.put<string>(this._url, script, HTTPOptions);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<Script>(this._url + id);
    }
}
