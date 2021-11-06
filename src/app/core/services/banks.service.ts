import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank.model';

@Injectable({
    providedIn: 'root'
})
export class BanksService {
    private readonly _url = `${environment.authenticationServerUrl}/bank/`;
    constructor(private http: HttpClient) { }

    getAll(gameId: string): Observable<Bank[]> {
        return this.http.get<Bank[]>(this._url + `all?gameId=${gameId}`);
    }

    get(id: number): Observable<Bank> {
        return this.http.get<Bank>(this._url + id);
    }

    save(bank: Bank): Observable<Bank> {
        return this.http.put<Bank>(this._url, bank);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<Bank>(this._url + id);
    }
}
