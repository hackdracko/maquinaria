import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministratorComponent} from './administrator.component';
import {AdministratorRoutingModule} from "./@routing/administrator-routing.module";
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
} from '@angular/material';
import { UserComponent } from './user/user.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { UserAddComponent } from './user-add/user-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WidgetsModule} from "../@common/widgets/widgets.module";
import { UserEditComponent } from './user-edit/user-edit.component';
import { RolComponent } from './rol/rol.component';
import { RolAddComponent } from './rol-add/rol-add.component';
import { RolEditComponent } from './rol-edit/rol-edit.component';
import { ModelComponent } from './model/model.component';
import { ModelAddComponent } from './model-add/model-add.component';
import { ModelEditComponent } from './model-edit/model-edit.component';
import { MachineComponent } from './machine/machine.component';
import { MachineAddComponent } from './machine-add/machine-add.component';
import { MachineEditComponent } from './machine-edit/machine-edit.component';
import { ProcessComponent } from './process/process.component';
import { ProcessAddComponent } from './process-add/process-add.component';
import { ProcessEditComponent } from './process-edit/process-edit.component';
import { TurnComponent } from './turn/turn.component';
import { TurnAddComponent } from './turn-add/turn-add.component';
import { TurnEditComponent } from './turn-edit/turn-edit.component';
import { ProductComponent } from './product/product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { StockComponent } from './stock/stock.component';
import { StockEntriesComponent } from './stock-entries/stock-entries.component';
import {StockDeparturesComponent} from "./stock-departures/stock-departures.component";
import { UnitComponent } from './unit/unit.component';
import { UnitAddComponent } from './unit-add/unit-add.component';
import { UnitEditComponent } from './unit-edit/unit-edit.component';
import { TypeComponent } from './type/type.component';
import { TypeAddComponent } from './type-add/type-add.component';
import { TypeEditComponent } from './type-edit/type-edit.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        AdministratorRoutingModule,
        FlexLayoutModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        WidgetsModule,
    ],
    declarations: [AdministratorComponent,
                    UserComponent,
                    UserAddComponent,
                    UserEditComponent,
                    RolComponent,
                    RolAddComponent,
                    RolEditComponent,
                    ModelComponent,
                    ModelAddComponent,
                    ModelEditComponent,
                    MachineComponent,
                    MachineAddComponent,
                    MachineEditComponent,
                    ProcessComponent,
                    ProcessAddComponent,
                    ProcessEditComponent,
                    TurnComponent,
                    TurnAddComponent,
                    TurnEditComponent,
                    ProductComponent,
                    ProductAddComponent,
                    ProductEditComponent,
                    StockComponent,
                    StockEntriesComponent,
                    StockDeparturesComponent,
                    UnitComponent,
                    UnitAddComponent,
                    UnitEditComponent,
                    TypeComponent,
                    TypeAddComponent,
                    TypeEditComponent,]
})
export class AdministratorModule {
}
