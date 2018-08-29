import { NgModule } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { FlexLayoutModule } from "@angular/flex-layout";

import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
} from '@angular/material';


/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
@NgModule({
    exports: [
        FlexLayoutModule,

        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

        PlatformModule,
        ObserversModule
    ]
})
export class CustomMaterialModule {}