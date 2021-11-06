import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registration/register.component';
import { ScriptComponent } from './admin/script/script.component';
import { GamesComponent } from './admin/games/games.component';
import { CoreModule } from './core/core.modulte';
import { RoleAuthGuard } from './core/guards/role-auth.guard';

import { NgxSpinnerModule } from "ngx-spinner";
import { QRCodeModule } from 'angularx-qrcode';
import { GameComponent } from './admin/games/game/game.component';

const appRoutes: Routes = [
  {
    path: 'home',
    canActivate: [RoleAuthGuard],
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'scripts',
    canActivate: [RoleAuthGuard],
    component: ScriptComponent
  },
  {
    path: 'games',
    canActivate: [RoleAuthGuard],
    component: GamesComponent
  },
  {
    path: 'games/:id',
    canActivate: [RoleAuthGuard],
    component: GameComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ScriptComponent,
    GamesComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    NgxSpinnerModule,
    QRCodeModule
  ],
  providers: [RoleAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
