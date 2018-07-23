/** Angular Libs **/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatProgressBarModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Third Party Vendors **/

/** Project components **/
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogInfoComponent } from "./dialog-info/dialog-info.component";
import {DialogConfirmComponent} from "./dialog-confirm/dialog-confirm.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        MatDialogModule, MatButtonModule, MatInputModule, MatProgressBarModule,
        MatSliderModule, FlexLayoutModule, MatCardModule, MatAutocompleteModule,
        MatFormFieldModule, MatProgressSpinnerModule, MatIconModule, MatToolbarModule,
        MatSelectModule, MatCheckboxModule, MatTooltipModule
    ],
    declarations: [
        DialogInfoComponent,
        DialogConfirmComponent,
    ],
    exports: [
        DialogInfoComponent,
        DialogConfirmComponent,
    ],
    entryComponents: [
        DialogInfoComponent,
        DialogConfirmComponent,
    ]
})
export class WidgetsModule {
}
