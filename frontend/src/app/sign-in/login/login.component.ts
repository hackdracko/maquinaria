import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RouterAnimations, FadeInAnimation  } from '../../@common/animate';
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'app-login',
    styleUrls: [ './login.component.scss' ],
    templateUrl: './login.component.html',
    animations: [ RouterAnimations.fadeIn, FadeInAnimation.trigger ]
})
export class LoginComponent implements OnInit {

    /**
     * Login Form Group reference
     */
    public FormGroup: FormGroup;

    /**
     * Current form state
     */
    public formState: 'success' | 'fail' | 'request' | 'clear' = 'clear';

    /**
     * Component class constructor
     */
    constructor(
        private router: Router,
        public formBuilder: FormBuilder,
        private authenticationService: AuthService,
    ) {  }

    /**
     * OnInit Component event
     */
    public ngOnInit() {
        //this.rest.revoke();

        this.FormGroup = this.formBuilder.group({
            email: [ null,
                Validators.compose([ Validators.required, Validators.minLength(4) ])
            ],
            password: [ null,
                Validators.compose([ Validators.required, Validators.minLength(6) ])
            ],
        });
    }

    /**
     * Authorization method.
     *
     * On request start the login form is locked
     */
    public authorize() {
        if ( this.FormGroup.status === 'INVALID' ) {
            const controls = [ 'email', 'password' ];
            controls.forEach((ctrl) => { this.FormGroup.get(ctrl).markAsTouched(); });
            return;
        }

        if ( this.formState === 'request' ) { return; }

        const data = this.FormGroup.value;
        this.formState = 'request';
        this.formLock();

        this.authenticationService.login(data).subscribe(
            data => {
                this.formUnlock();

                localStorage.setItem('token', data.token);
                localStorage.setItem('user_id', data.data.id);
                localStorage.setItem('username', data.data.username);
                localStorage.setItem('user_role', data.data.role);
                this.router.navigate(['/administrator']);
            },
            (error) => {
                this.formUnlock();
                //this.formIsSending = false;
                //this.passwordInvalid = true;

                // show error
                const ctrl = this.FormGroup.get('password');
                ctrl.setErrors({ 'passwordInvalid': true });
                ctrl.markAsTouched();
            }
        );

        /*this.rest.authorize(data.email.trim(), data.password.trim())
            .subscribe(
                (payload) => {
                    this.formUnlock();
                    this.state.set('account', payload.account);

                    localStorage.setItem('LocalStorage', 'EUREKA!!!');

                    const rolesUri = this.settings.get('rolesUri');
                    if ( rolesUri && rolesUri[payload.account.role] ) {
                        this.router.navigate([ rolesUri[payload.account.role] ]).then(() => {});
                    } else {
                        this.router.navigate(['/forbidden']).then(() => {});
                    }
                },
                () => {
                    this.formState = 'fail';
                    this.formUnlock();
                    console.log('Authorization error');
                }
            );*/
    }

    /**
     * Go to Account Recovery form
     */
    public goToAccountRecovery() {
        if ( this.formState === 'request' ) { return; }

        this.router.navigate(['/account-recovery']).then(() => {});
    }

    /**
     * Hide the AuthError message and reset the password input from the login form
     */
    public retry() {
        this.FormGroup.get('password').setValue('');
        this.formState = 'clear';
    }

    /**
     * Lock the login input forms
     */
    private formLock() {
        const controls = [ 'email', 'password' ];
        controls.forEach((ctrl) => { this.FormGroup.get(ctrl).disable(); });
    }

    /**
     * Lock the login input forms
     */
    private formUnlock() {
        const controls = [ 'email', 'password' ];
        controls.forEach((ctrl) => { this.FormGroup.get(ctrl).enable(); });
    }

}
