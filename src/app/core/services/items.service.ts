import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
    providedIn: 'root'
})
export class ItemsService {
    private readonly _url = `${environment.authenticationServerUrl}/item/`;
    constructor(private http: HttpClient) { }

    getAll(gameId: string): Observable<Item[]> {
        return this.http.get<Item[]>(this._url + `all?gameId=${gameId}`);
    }

    get(id: number): Observable<Item> {
        return this.http.get<Item>(this._url + id);
    }

    save(item: Item): Observable<Item> {
        if (item.id) {
            return this.http.put<Item>(this._url + item.id, item);
        } else {
            return this.http.post<Item>(this._url, item);
        }
    }
}
