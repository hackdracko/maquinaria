import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-sign-in',
    styleUrls: [ './sign-in.component.scss' ],
    templateUrl: 'sign-in.component.html',
})
export class SignInComponent implements OnInit {

    constructor(
        private title: Title
    ) {  }

    /**
     * Revoke credentials
     */
    public ngOnInit() {
        this.title.setTitle( 'TEST' );
    }

}
