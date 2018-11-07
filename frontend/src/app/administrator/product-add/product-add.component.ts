import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {DialogInfoComponent} from "../../@common/widgets/dialog-info/dialog-info.component";
import {MatDialog} from "@angular/material";
import {DialogConfirmComponent} from "../../@common/widgets/dialog-confirm/dialog-confirm.component";
import * as _ from 'lodash';
import {ICatalog} from "../../@common/models";

@Component({
    selector: 'app-product-add',
    templateUrl: './product-add.component.html',
    styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
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
    /**
     * Result User
     * @type {ICatalog}
     */
    public resultModel: ICatalog | null;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private _formBuilder: FormBuilder,
        private authenticationService: AuthService,
    ) {
    }

    ngOnInit() {
        this.form();
        this.getModels();
    }
    public form(){
        this.formGroup = this._formBuilder.group({
            code: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(3)
                ])
            ],
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
            model: [null,
                Validators.compose([
                    Validators.required
                ])
            ],
        });
    }

    get code() {
        return this.formGroup.get('title');
    }

    get title() {
        return this.formGroup.get('title');
    }

    get description() {
        return this.formGroup.get('description');
    }


    public back() {
        this.router.navigate(['administrator/product']);
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
            data: {title: 'Información', description: 'Estas seguro de crear un nuevo Producto'}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.save();
            }
        });
    }

    public getModels() {
        console.log("Models");
        this.loading = true;
        this.authenticationService.get('model', '').subscribe(
            payload => {
                this.loading = false;
                this.resultModel = payload.data;
                //this.form();
            },
            (error) => {
                this.loading = false;
                console.log("Error " + error);
            }
        );
    }

    public save() {
        console.log("Save Product");
        this.loading = true;
        this.formLock();
        let data = {
            "code": this.formGroup.value.code,
            "title": this.formGroup.value.title,
            "description": this.formGroup.value.description,
            "cat_model_id": this.formGroup.value.model,
        };
        this.authenticationService.post('product', data).subscribe(
            payload => {
                this.loading = false;
                this.formUnlock();
                this.dialogInfo("Información", "El Producto se creo correctamente");
                this.router.navigate(['administrator/product']);
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
