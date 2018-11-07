import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {DialogInfoComponent} from "../../@common/widgets/dialog-info/dialog-info.component";
import {MatDialog} from "@angular/material";
import {DialogConfirmComponent} from "../../@common/widgets/dialog-confirm/dialog-confirm.component";
import * as _ from 'lodash';

@Component({
    selector: 'app-machine-add',
    templateUrl: './machine-add.component.html',
    styleUrls: ['./machine-add.component.css']
})
export class MachineAddComponent implements OnInit {
    /**
     * Indicates FormGroup
     * @type {FormGroup}
     */
    public formGroup: FormGroup;
    /**
     * Indicates loading
     * @type {boolean}
     */
    public loading = false;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private _formBuilder: FormBuilder,
        private authenticationService: AuthService,
    ) {
    }

    ngOnInit() {
        this.formGroup = this._formBuilder.group({
            title: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(3)
                ])
            ],
            description: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(3)
                ])
            ],
        });
    }

    get title() {
        return this.formGroup.get('title');
    }

    get description() {
        return this.formGroup.get('description');
    }


    public back() {
        this.router.navigate(['administrator/machine']);
    }

    public cancel() {
        this.formGroup.reset();
    }

    public dialogInfo(tit, desc) {
        this.dialog.open(DialogInfoComponent, {
            maxWidth: '800px',
            height: 'auto',
            data: {title: tit, description: desc}
        });
    }

    public dialogConfirm() {
        let dialogRef = this.dialog.open(DialogConfirmComponent, {
            maxWidth: '800px',
            height: 'auto',
            data: {title: 'Información', description: 'Estas seguro de crear una nueva Maquina'}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.save();
            }
        });
    }

    public save() {
        console.log("Save Machine");
        this.loading = true;
        this.formLock();
        let data = {
            "title": this.formGroup.value.title,
            "description": this.formGroup.value.description,
        };
        this.authenticationService.post('machine', data).subscribe(
            payload => {
                this.loading = false;
                this.formUnlock();
                this.dialogInfo("Información", "La Maquina se creo correctamente");
                this.router.navigate(['administrator/machine']);
            },
            (error) => {
                if (error.status == 422) {
                    let htmlError: string;
                    for (let msj in error.error.errors) {
                        htmlError = error.error.errors[msj];
                    }
                    this.dialogInfo("Error", htmlError);
                }
                this.formUnlock();
                this.loading = false;
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
