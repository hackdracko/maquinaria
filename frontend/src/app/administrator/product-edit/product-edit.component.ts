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
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
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
    /**
     * Result User
     * @type {ICatalog}
     */
    public resultModel: ICatalog | null;

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
        this.getModels();
    }

    public form() {
        this.formGroup = this._formBuilder.group({
            code: [this.result ? this.result.code : null,
                Validators.compose([
                    Validators.required, Validators.minLength(3)
                ])
            ],
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
            model: [this.result ? this.result.cat_model_id : null,
                Validators.compose([
                    Validators.required
                ])
            ],
        });
    }

    get code() {
        return this.formGroup.get('code');
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
            data: {title: 'Información', description: 'Estas seguro de editar el Producto'}
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
        this.authenticationService.get('product/' + this.id, '').subscribe(
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
        this.authenticationService.put('product/' + this.id, data).subscribe(
            payload => {
                this.loading = false;
                this.formUnlock();
                this.dialogInfo("Información", "El Producto se edito correctamente");
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
