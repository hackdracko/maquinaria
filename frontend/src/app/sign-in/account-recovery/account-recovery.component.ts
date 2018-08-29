import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterAnimations, FadeInAnimation } from '../../@common/animate';

@Component({
    selector: 'app-account-recovery',
    styleUrls: [ 'account-recovery.component.scss' ],
    templateUrl: './account-recovery.component.html',
    animations: [ RouterAnimations.fadeIn, FadeInAnimation.trigger ]
})
export class AccountRecoveryComponent implements OnInit {

    /**
     * Account Recovery Form Group reference
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
        public formBuilder: FormBuilder
    ) {  }

    /**
     * OnInit Component event
     */
    public ngOnInit() {
        this.FormGroup = this.formBuilder.group({
            username: [ null,
                Validators.compose([ Validators.required, Validators.minLength(5) ])
            ]
        });
    }

    /**
     * Hide the AuthError message and reset the username input from Account Recovery form
     */
    public retry() {
        this.FormGroup.get('username').setValue('');
        this.formState = 'clear';
    }

    /**
     * Lock the recovery inputs form
     */
    private formLock() {
        const controls = [ 'username' ];
        controls.forEach((ctrl) => { this.FormGroup.get(ctrl).disable(); });
    }

    /**
     * Lock the login inputs form
     */
    private formUnlock() {
        const controls = [ 'username' ];
        controls.forEach((ctrl) => { this.FormGroup.get(ctrl).enable(); });
    }

    /**
     * Account Recovery method.
     *
     * On request start the account recovery form is locked
     */
    public requestRecovery() {
        if ( this.FormGroup.status === 'INVALID' ) {
            this.FormGroup.get('username').markAsTouched();
            return;
        }

        if ( this.formState === 'request' ) { return; }

        this.formState = 'request';
        this.formLock();

        /*this.rest.post('password-recovery', this.FormGroup.value)
            .subscribe(
                () => {
                    this.formState = 'success';
                    this.formUnlock();
                },
                () => {
                    this.formState = 'fail';
                    this.FormGroup.get('username').setValue('');
                    this.formUnlock();
                }
            );*/
    }

    /**
     * Go to Account Recovery form
     */
    public goToLogin() {
        if ( this.formState === 'request' ) { return }
        this.router.navigate(['/login']).then(() => {});
    }

}
