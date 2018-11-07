import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-nocontent',
    styleUrls: ['./no-content.component.scss'],
    templateUrl: './no-content.component.html',
})
export class NoContentComponent implements OnInit {


    /**
     * Component Class constructor
     *
     * Define Location Object as class private member
     * @param location
     */
    constructor(private location: Location) {
    }

    /**
     * Component initialization event
     */
    public ngOnInit() {
    }

    /**
     * Go back to the previous page
     */
    public goBack() {
        this.location.back();
    }

}
