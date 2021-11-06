import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    returnUrl: string;
    constructor(private _route: ActivatedRoute, private _userService: UserService, private _router: Router, private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/home';
        console.log(this.returnUrl)
        this.registerForm = this._formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            middleName: new FormControl('', Validators.required),
        }, { validator: this.MustMatch('password', 'confirmPassword') });
    }

    get f() { return this.registerForm.controls; }

    onRegisterSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this._userService.register(this.registerForm.value).subscribe({
            next: (response) => {
                this._userService.setSession(response.token, response.userId);
                this._router.navigateByUrl(this.returnUrl);
            },
            error: response => {
            }
        })

        this.submitted = false;
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }

            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
}
