import {Routes} from '@angular/router';
import {AdministratorComponent} from "../administrator.component";
import {UserComponent} from "../user/user.component";
import {UserAddComponent} from "../user-add/user-add.component";
import {UserEditComponent} from "../user-edit/user-edit.component";
import {RolComponent} from "../rol/rol.component";
import {RolAddComponent} from "../rol-add/rol-add.component";
import {RolEditComponent} from "../rol-edit/rol-edit.component";
import {ModelComponent} from "../model/model.component";
import {ModelAddComponent} from "../model-add/model-add.component";
import {ModelEditComponent} from "../model-edit/model-edit.component";
import {MachineComponent} from "../machine/machine.component";
import {MachineAddComponent} from "../machine-add/machine-add.component";
import {MachineEditComponent} from "../machine-edit/machine-edit.component";
import {ProcessComponent} from "../process/process.component";
import {ProcessAddComponent} from "../process-add/process-add.component";
import {ProcessEditComponent} from "../process-edit/process-edit.component";
import {TurnComponent} from "../turn/turn.component";
import {TurnAddComponent} from "../turn-add/turn-add.component";
import {TurnEditComponent} from "../turn-edit/turn-edit.component";
import {ProductComponent} from "../product/product.component";
import {ProductAddComponent} from "../product-add/product-add.component";
import {ProductEditComponent} from "../product-edit/product-edit.component";
import {StockComponent} from "../stock/stock.component";
import {StockEntriesComponent} from "../stock-entries/stock-entries.component";
import {StockDeparturesComponent} from "../stock-departures/stock-departures.component";

export const ROUTES: Routes = [
    {
        path: '',
        component: AdministratorComponent,
        children: [
            {
                path: 'user',
                component: UserComponent
            },
            {
                path: 'user/add',
                component: UserAddComponent
            },
            {
                path: 'user/edit/:id',
                component: UserEditComponent
            },
            {
                path: 'rol',
                component: RolComponent
            },
            {
                path: 'rol/add',
                component: RolAddComponent
            },
            {
                path: 'rol/edit/:id',
                component: RolEditComponent
            },
            {
                path: 'model',
                component: ModelComponent
            },
            {
                path: 'model/add',
                component: ModelAddComponent
            },
            {
                path: 'model/edit/:id',
                component: ModelEditComponent
            },
            {
                path: 'machine',
                component: MachineComponent
            },
            {
                path: 'machine/add',
                component: MachineAddComponent
            },
            {
                path: 'machine/edit/:id',
                component: MachineEditComponent
            },
            {
                path: 'process',
                component: ProcessComponent
            },
            {
                path: 'process/add',
                component: ProcessAddComponent
            },
            {
                path: 'process/edit/:id',
                component: ProcessEditComponent
            },
            {
                path: 'turn',
                component: TurnComponent
            },
            {
                path: 'turn/add',
                component: TurnAddComponent
            },
            {
                path: 'turn/edit/:id',
                component: TurnEditComponent
            },
            {
                path: 'product',
                component: ProductComponent
            },
            {
                path: 'product/add',
                component: ProductAddComponent
            },
            {
                path: 'product/edit/:id',
                component: ProductEditComponent
            },
            {
                path: 'stock',
                component: StockComponent
            },
            {
                path: 'stock/entries',
                component: StockEntriesComponent
            },
            {
                path: 'stock/departures',
                component: StockDeparturesComponent
            },
        ]
    }
];