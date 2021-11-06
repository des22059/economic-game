import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class RoleAuthGuard implements CanActivate {
    constructor(private _authService: UserService, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this._authService.isLoggedIn()) {
            this._router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            return false;
        } else {
            return true;
        }
        // const roles: ApplicationUserRole[] | undefined = childRoute.data.role;
        // return !roles || roles.some(role => this._authService.currentUser.roles.includes(role));
    }
}