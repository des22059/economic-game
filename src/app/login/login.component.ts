import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;

    constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService, private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/home';
        console.log(this.returnUrl)
        this.loginForm = this._formBuilder.group({
            username: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
        });
    }

    get f() { return this.loginForm.controls; }


    onLoginSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this._userService.login(this.loginForm.value).subscribe({
            next: (response) => {
                this._userService.setSession(response.token, response.userId);
                this._userService.isLoggedIn();
                this._router.navigateByUrl(this.returnUrl);
            },
            error: response => {
            }
        })

        this.submitted = false;
    }
}
