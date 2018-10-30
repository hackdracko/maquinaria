import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {DialogInfoComponent} from "../../@common/widgets/dialog-info/dialog-info.component";
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {DialogConfirmComponent} from "../../@common/widgets/dialog-confirm/dialog-confirm.component";
import * as _ from 'lodash';
import {ICatalog, ICatalogProduct, IRootCatalogProduct, IStock} from "../../@common/models";
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {st} from "@angular/core/src/render3";
import {IPaginate} from "../../@common/models/IPaginate";

@Component({
    selector: 'app-stock-departures',
    templateUrl: './stock-departures.component.html',
    styleUrls: ['./stock-departures.component.css']
})
export class StockDeparturesComponent implements OnInit {
    /**
     * Columns Displayed
     * */
    displayedColumns = ['position', 'deliveryPerson', 'user', 'lote', 'quantity', 'unit', 'type', 'observations', 'date_add', 'actions'];
    /**
     * Paginator for table
     * */
    @ViewChild(MatPaginator) paginator: MatPaginator;
    /**
     * Table's datasource
     * */
    dataSource = new MatTableDataSource<IStock>();
    /**
     * Result Length
     * */
    resultsLength = 0;
    /**
     * Result per page
     * */
    perPage = 0;
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
     * Result Products
     * @type {ICatalog}
     */
    public resultProduct: any;
    /**
     * Result Stock
     * @type {IStock}
     */
    public resultStock: IStock | null;
    /**
     * Create Stock Obj
     * @type {obj}
     */
    public objStock : {};
    /**
     * Create Stock Array
     * @type {array}
     */
    public arrStock = [];

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private _formBuilder: FormBuilder,
        private authenticationService: AuthService,
    ) {
    }

    ngOnInit() {
        this.formGroup = this._formBuilder.group({
            product: [null,
                Validators.compose([
                    Validators.required
                ])
            ],
            description: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(3)
                ])
            ],
            pieces: [null,
                Validators.compose([
                    Validators.required
                ])
            ],
        });
        this.getProducts();
        this.getDepartures('');
    }

    get description() {
        return this.formGroup.get('description');
    }


    public back() {
        this.router.navigate(['administrator/stock']);
    }

    public cancel() {
        this.formGroup.reset();
    }

    public getProducts() {
        console.log("Products");
        this.loading = true;
        this.authenticationService.get('stock/comboDepartures', '').subscribe(
            payload => {
                this.loading = false;
                this.resultProduct = payload;
                //this.form();
            },
            (error) => {
                this.loading = false;
                console.log("Error " + error);
            }
        );
    }

    public getDepartures(search){
        console.log("Get Departures");
        if(search != ''){
            this.paginator.pageIndex = 0;
        }
        merge(this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.loading = true;
                    return this.authenticationService.get('stock/departures',
                        `?page=${this.paginator.pageIndex + 1}&search=${search}`
                    );
                }),
                map((data: IPaginate<IStock>) => {
                    this.loading = false;
                    this.resultsLength = data.total;
                    this.perPage = data.per_page;
                    return data.data;
                }),
                catchError(() => {
                    this.loading = false;
                    return observableOf([]);
                })
            ).subscribe((data: IStock[]) => this.dataSource.data = data);
    }

    public dialogInfo(tit, desc) {
        this.dialog.open(DialogInfoComponent, {
            maxWidth: '800px',
            height: 'auto',
            data: {title: tit, description: desc}
        });
    }

    public dialogConfirm(id) {
        let dialogRef = this.dialog.open(DialogConfirmComponent, {
            maxWidth: '800px',
            height: 'auto',
            data: {title: 'Información', description: 'Estas seguro de eliminar este Inventario'}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete(id);
            }
        });
    }

    public getValueComboProductById(id){
        let val :string;
        for(let product of this.resultProduct.products){
            if(id == product.id){
                val = product.title;
            }
        }
        return val;
    }

    public addStock(){
        console.log("Agregando");
        let productVal = this.getValueComboProductById(this.formGroup.value.product);
        let count = this.arrStock.length;
        this.objStock = {
            "id" : (count + 1),
            "cat_product_id" : this.formGroup.value.product,
            "productValue" : productVal,
            "description" : this.formGroup.value.description,
            "pieces" : this.formGroup.value.pieces,
        };
        this.arrStock.push(this.objStock);
    }

    public removeStock(id){
        console.log("Eliminando" + id);
        let count = 0;
        for(let stock of this.arrStock){
            if(stock.id == id){
                this.arrStock.splice(count, 1);
            }
            count = count +1;
        }
        this.updateIndicesStock();
    }

    public updateIndicesStock(){
        console.log("Actualizando");
        let count = 1;
        for(let stock of this.arrStock){
            stock.id = count;
            count = count + 1;
        }
    }

    public getTotalProduct(id){
        let val :number;
        for(let product of this.resultProduct.products){
            if(id == product.id){
                val = product.total;
            }
        }
        return val;
    }

    public save() {
        console.log("Save Stock");
        let total = this.getTotalProduct(this.formGroup.value.product);
        if(total == 0){
            this.dialogInfo("Error", "No puedes realizar salidas ya que no cuentas con este producto");
            return;
        }
        if(this.formGroup.value.pieces > total){
            this.dialogInfo("Error", "No puedes Asignar mas de " + total + " piezas");
            return;
        }
        this.loading = true;
        this.formLock();
        let data = {
            "cat_product_id" : this.formGroup.value.product,
            "description" : this.formGroup.value.description,
            "pieces" : this.formGroup.value.pieces,
            "type" : 2
        };
        this.authenticationService.post('stock', data).subscribe(
            payload => {
                this.loading = false;
                this.formUnlock();
                this.dialogInfo("Información", "El Stock se creo correctamente");
                this.cancel();
                this.getProducts();
                this.getDepartures('');
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

    public delete(id){
        console.log("Delete Stock");
        this.loading = true;
        this.authenticationService.delete('stock/' + id).subscribe(
            payload => {
                this.loading = false;
                this.dialogInfo("Información", "El Inventario se eliminó correctamente");
                this.getProducts();
                this.getDepartures('');
            },
            (error) => {
                if(error.status == 422){
                    let htmlError : string;
                    for (let msj in error.error.errors) {
                        htmlError = error.error.errors[msj];
                    }
                    this.dialogInfo("Error", htmlError);
                }
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
