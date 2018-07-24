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
        ]
    }
];