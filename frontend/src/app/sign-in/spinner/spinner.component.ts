import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-sign-in-spinner',
    styleUrls: [ './spinner.component.scss' ],
    templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnInit {

    @Input() diameter = 50;

    /**
     * Component class constructor
     */
    constructor(  ) {  }

    /**
     * OnInit Component event
     */
    public ngOnInit() { }
}
