import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {IUser} from "../../@common/models";
import {Router} from "@angular/router";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {IPaginate} from "../../@common/models/IPaginate";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    /**
     * Paginator for table
     * */
    @ViewChild(MatPaginator) paginator: MatPaginator;
    /**
     * Table's datasource
     * */
    dataSource = new MatTableDataSource<IUser>();
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
     * @type {IUser}
     */
    public results: IUser | null;

    constructor(
        private router: Router,
        private authenticationService: AuthService,
    ) {
    }

    ngOnInit() {
        this.getIndex('');
    }

    public search(value){
        clearTimeout(this.lastChangeTimer);

        this.lastChangeTimer = setTimeout(() => {
            console.log("buscando " + value);
            this.getIndex(value);
        }, 500);
    }

    public getIndex(search){
        console.log("Get Users");
        if(search != ''){
            this.paginator.pageIndex = 0;
        }
        merge(this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.loading = true;
                    return this.authenticationService.get('user',
                        `?page=${this.paginator.pageIndex + 1}&search=${search}`
                    );
                }),
                map((data: IPaginate<IUser>) => {
                    this.loading = false;
                    this.resultsLength = data.total;
                    this.perPage = data.per_page;
                    return data.data;
                }),
                catchError(() => {
                    this.loading = false;
                    return observableOf([]);
                })
            ).subscribe((data: IUser[]) => this.dataSource.data = data);
    }

    public add(){
        this.router.navigate(['administrator/user/add']);
    }

    public edit(id){
        this.router.navigate(['administrator/user/edit/' + id]);
    }

}
