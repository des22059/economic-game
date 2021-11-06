import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// import { AuthService } from './auth.service';
import { httpIterceptorProviders } from './interceptors';
import { UserService } from './services/user.service';
import { RoleAuthGuard } from './guards/role-auth.guard';
import { ItemsService } from './services/items.service';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    declarations: [],
    providers: [UserService, RoleAuthGuard, ItemsService, httpIterceptorProviders]
})
export class CoreModule { }
