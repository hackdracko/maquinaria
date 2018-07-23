import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
//import { RestClientService } from 'angular-rest';
import { DialogPasswordRecoveryComponent } from './dialog-password-recovery/dialog.password-recovery.component';

@Component({
    selector: 'app-password-recovery',
    templateUrl: './password-recovery.component.html',
    styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

    /**
     * Password Recovery form group reference
     * @type {FormGroup}
     */
    public passwordRecoveryFormGroup: FormGroup;

    /**
     * Indicates a status of the form
     * @type {boolean}
     */
    public passwordRecoveryFormIsSending = false;


    /**
     * A var to display an error.
     * @type {string}
     */
    public passwordRecoveryServerError = '';


    /**
     * An indicator that shows "invalid password" error message
     * @type {boolean}
     */
    public passwordInvalid = false;


    constructor(private router: Router,
        private _formBuilder: FormBuilder,
        //private rest: RestClientService,
        private dialog: MatDialog) {
    }


    ngOnInit() {
        this.passwordRecoveryFormGroup = this._formBuilder.group({
            username: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(5), Validators.email
                ])
            ]
        });
    }



    /**
     * Go back button
     */
    public goBack() {
        this.router.navigate(['/auth/login']);
    }


    /**
     * Lock the login input forms
     */
    private formLock() {
        const controls = ['username'];
        controls.forEach((ctrl) => {
            this.passwordRecoveryFormGroup.get(ctrl).disable();
        });
    }

    /**
     * Lock the login input forms
     */
    private formUnlock() {
        const controls = ['username'];
        controls.forEach((ctrl) => {
            this.passwordRecoveryFormGroup.get(ctrl).enable();
        });
    }


    /**
     * Send password recovery request
     */
    public passwordRecoveryFormSubmit() {
        this.passwordRecoveryFormIsSending = true;
        this.passwordRecoveryServerError = '';
        this.formLock();

        const data = this.passwordRecoveryFormGroup.value;
        /*this.rest.public().post('/password-recovery', { 'username': data.username }).subscribe(
            result => {
                const dialogRef = this.dialog.open(DialogPasswordRecoveryComponent, {
                    data: { message: 'Se recupero la contraseña, en breve te llegara un correo' }
                } as MatDialogConfig);

                dialogRef.afterClosed().subscribe(() => {
                    this.formUnlock();
                    this.passwordRecoveryFormIsSending = false;
                    this.router.navigate(['/auth/login']);
                });
            },

            error => {
                this.formUnlock();
                this.passwordRecoveryFormIsSending = false;

                // show error
                this.passwordRecoveryServerError = error.message;
                const ctrl = this.passwordRecoveryFormGroup.get('username');
                ctrl.setErrors({ 'serverError': true });
                ctrl.markAsTouched();
            }
        );*/
    }

}
