import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {AuthService} from "../auth/auth.service";

@Component({
    selector: 'app-administrator',
    templateUrl: './administrator.component.html',
    styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit, OnDestroy {
    mobileQuery: MediaQueryList;

    public username: string;

    private _mobileQueryListener: () => void;

    constructor(
        private authenticationService: AuthService,
        changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.username = sessionStorage.getItem('username');
    }

    public logout(){
        this.authenticationService.logout();
    }

}
