import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private readonly _url = `${environment.authenticationServerUrl}/game/`;
    constructor(private http: HttpClient) { }

    getAll(): Observable<Game[]> {
        return this.http.get<Game[]>(this._url + 'all');
    }

    create(game: Game): Observable<Game> {
        let HTTPOptions: Object = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            responseType: 'text'
        }
        return this.http.post<Game>(this._url + 'create', game, HTTPOptions);
    }

    init(id: string): Observable<any> {
        return this.http.post<Game>(this._url + 'init/' + id, {});
    }

    start(id: string): Observable<Game> {
        return this.http.post<Game>(this._url + 'start/' + id, {});
    }
}
