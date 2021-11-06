import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (
            (req.url.includes('auth/register') && req.method === 'POST') ||
            (req.url.includes('auth/login') && req.method === 'POST') ||
            req.headers.has('Authorization')) {
            return next.handle(req);
        } else {
            const authService = this.injector.get(UserService);
            console.log(authService.authorizationHeader)
            const authReq = req.clone({ setHeaders: { Authorization: authService.authorizationHeader } });
            return next.handle(authReq);
        }
    }
}
