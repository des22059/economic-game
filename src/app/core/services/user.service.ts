import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/user/register.model';
import { AuthResponseModel } from '../models/user/token.model';
import { LoginModel } from '../models/user/login.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly _url = `${environment.authenticationServerUrl}/auth`;
    constructor(private http: HttpClient) { }

    register(registerModel: RegisterModel): Observable<AuthResponseModel> {
        return this.http.post<AuthResponseModel>(this._url + '/register', registerModel);
    }

    login(loginModel: LoginModel): Observable<AuthResponseModel> {
        return this.http.post<AuthResponseModel>(this._url + '/login', loginModel);
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('userId');
    }

    setSession(token: string, userId: string) {
        localStorage.setItem('access_token', token);
        localStorage.setItem('userId', userId);
    }

    isLoggedIn() {
        const expiration = localStorage.getItem('access_token');
        return expiration !== null;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    get authorizationHeader() {
        return 'Bearer ' + localStorage.getItem('access_token');
    }
}