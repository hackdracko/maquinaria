import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as _ from 'lodash';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    /**
     * Login form group reference
     * @type {FormGroup}
     */
    public formGroup: FormGroup;

    /**
     * Indicates a status of the form
     * @type {boolean}
     */
    public formIsSending = false;

    /**
     * An indicator that shows "invalid password" error message
     * @type {boolean}
     */
    public passwordInvalid = false;

    constructor(
        private router: Router,
        private _formBuilder: FormBuilder,
        private authenticationService: AuthService,
    ) {
    }

    ngOnInit() {
        this.formGroup = this._formBuilder.group({
            email: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(5), Validators.email
                ])
            ],

            password: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(6)
                ])
            ]
        });
    }

    /**
     * Password recovery navigation
     */
    public gotoPasswordRecovery() {
        this.router.navigate(['/auth/password-recovery']);
    }

    /**
     * Send a form and validates credentials
     */
    public submitForm() {
        this.formIsSending = true;
        this.formLock();

        const data = this.formGroup.value;
        this.authenticationService.login(data).subscribe(
            data => {
                this.formUnlock();
                this.formIsSending = false;
                localStorage.setItem('token', data.token);
                localStorage.setItem('user_id', data.data.id);
                localStorage.setItem('username', data.data.username);
                localStorage.setItem('user_role', data.data.role);
                this.router.navigate(['/administrator']);
            },
            (error) => {
                this.formUnlock();
                this.formIsSending = false;
                this.passwordInvalid = true;

                // show error
                const ctrl = this.formGroup.get('password');
                ctrl.setErrors({ 'passwordInvalid': true });
                ctrl.markAsTouched();
            }
        );
    }

    /**
     * Lock the login input forms
     */
    protected formLock() {
        const controls = _.keys(this.formGroup.controls);
        controls.forEach((ctrl) => {
            this.formGroup.get(ctrl).disable();
        });
    }

    /**
     * Lock the login input forms
     */
    protected formUnlock() {
        const controls = _.keys(this.formGroup.controls);
        controls.forEach((ctrl) => {
            this.formGroup.get(ctrl).enable();
        });
    }

}
