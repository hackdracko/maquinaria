import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogConfirmComponent} from "../../@common/widgets/dialog-confirm/dialog-confirm.component";
import {DialogInfoComponent} from "../../@common/widgets/dialog-info/dialog-info.component";
import * as _ from 'lodash';
import {Subscription} from "rxjs/internal/Subscription";
import {ICatalog} from "../../@common/models";

@Component({
    selector: 'app-model-edit',
    templateUrl: './model-edit.component.html',
    styleUrls: ['./model-edit.component.css']
})
export class ModelEditComponent implements OnInit {
    /**
     * Indicates FormGroup
     * @type {FormGroup}
     */
    public formGroup: FormGroup;
    /**
     * Indicates subscription
     * @type {Subscription}
     */
    private paramSubscription: Subscription;
    /**
     * Indicates loading
     * @type {boolean}
     */
    public loading = false;
    /**
     * Indicates id
     * @type {number}
     */
    public id: number;
    /**
     * Result User
     * @type {ICatalog}
     */
    public result: ICatalog | null;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private readonly route: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private authenticationService: AuthService,
    ) {
    }

    ngOnInit() {
        this.paramSubscription = this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.form();
        this.getInfo();
    }

    public form() {
        this.formGroup = this._formBuilder.group({
            title: [this.result ? this.result.title : null,
                Validators.compose([
                    Validators.required, Validators.minLength(3)
                ])
            ],
            description: [this.result ? this.result.description : null,
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
        this.router.navigate(['administrator/model']);
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
            data: {title: 'Información', description: 'Estas seguro de editar el Modelo'}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.save();
            }
        });
    }

    public getInfo() {
        console.log("Info");
        this.loading = true;
        this.authenticationService.get('model/' + this.id, '').subscribe(
            payload => {
                this.loading = false;
                this.result = payload;
                this.form();
            },
            (error) => {
                this.loading = false;
                console.log("Error " + error);
            }
        );
    }

    public save() {
        console.log("Save Model");
        this.loading = true;
        this.formLock();
        let data = {
            "title": this.formGroup.value.title,
            "description": this.formGroup.value.description,
        };
        this.authenticationService.put('model/' + this.id, data).subscribe(
            payload => {
                this.loading = false;
                this.formUnlock();
                this.dialogInfo("Información", "El Modelo se edito correctamente");
                this.router.navigate(['administrator/model']);
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
