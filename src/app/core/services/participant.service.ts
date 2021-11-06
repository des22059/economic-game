import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Participant } from '../models/participant.model';

@Injectable({
    providedIn: 'root'
})
export class ParticipantService {
    private readonly _url = `${environment.authenticationServerUrl}/participant/`;
    constructor(private http: HttpClient) { }

    get(gameId: string): Observable<Participant[]> {
        return this.http.get<Participant[]>(this._url + `?gameId=${gameId}`);
    }

    add(gameId: string, userId: string): Observable<Participant> {
        return this.http.post<Participant>(this._url + `register?gameId=${gameId}&userId=${userId}`, {});
    }

    remove(userId: string): Observable<any> {
        return this.http.post<any>(this._url + `userId=${userId}`, {});
    }
}
