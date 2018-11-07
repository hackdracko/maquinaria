import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ICatalog} from "../../@common/models";
import {Router} from "@angular/router";
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {IPaginate} from "../../@common/models/IPaginate";
import {DialogConfirmComponent} from "../../@common/widgets/dialog-confirm/dialog-confirm.component";
import {DialogInfoComponent} from "../../@common/widgets/dialog-info/dialog-info.component";

@Component({
    selector: 'app-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
    /**
     * Paginator for table
     * */
    @ViewChild(MatPaginator) paginator: MatPaginator;
    /**
     * Table's datasource
     * */
    dataSource = new MatTableDataSource<ICatalog>();
    /**
     * Result Length
     * */
    resultsLength = 0;
    /**
     * Result per page
     * */
    perPage = 0;
    /**
     * Indicates loading
     * @type {boolean}
     */
    public loading = false;
    /**
     * A timer for changes
     */
    private lastChangeTimer: any;
    /**
     * Result User
     * @type {ICatalog}
     */
    public results: ICatalog | null;

    constructor(private dialog: MatDialog,
                private router: Router,
                private authenticationService: AuthService,) {
    }

    ngOnInit() {
        this.getIndex('');
    }

    public search(value) {
        clearTimeout(this.lastChangeTimer);

        this.lastChangeTimer = setTimeout(() => {
            console.log("buscando " + value);
            this.getIndex(value);
        }, 500);
    }

    public getIndex(search) {
        console.log("Get Types");
        if (search != '') {
            this.paginator.pageIndex = 0;
        }
        merge(this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.loading = true;
                    return this.authenticationService.get('type',
                        `?page=${this.paginator.pageIndex + 1}&search=${search}`
                    );
                }),
                map((data: IPaginate<ICatalog>) => {
                    this.loading = false;
                    this.resultsLength = data.total;
                    this.perPage = data.per_page;
                    return data.data;
                }),
                catchError(() => {
                    this.loading = false;
                    return observableOf([]);
                })
            ).subscribe((data: ICatalog[]) => this.dataSource.data = data);
    }

    public add() {
        this.router.navigate(['administrator/type/add']);
    }

    public edit(id) {
        this.router.navigate(['administrator/type/edit/' + id]);
    }

    public delete(id) {
        console.log("Delete Type");
        this.loading = true;
        this.authenticationService.delete('type/' + id).subscribe(
            payload => {
                this.loading = false;
                this.dialogInfo("Información", "El Tipo se eliminó correctamente");
                this.getIndex('');
            },
            (error) => {
                if (error.status == 422) {
                    let htmlError: string;
                    for (let msj in error.error.errors) {
                        htmlError = error.error.errors[msj];
                    }
                    this.dialogInfo("Error", htmlError);
                }
                this.loading = false;
            }
        );
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
            data: {title: 'Información', description: 'Estas seguro de eliminar el Tipo'}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.delete(id);
            }
        });
    }
}
