import {Routes} from '@angular/router';
import {AdministratorComponent} from "../administrator.component";
import {UserComponent} from "../user/user.component";
import {UserAddComponent} from "../user-add/user-add.component";
import {UserEditComponent} from "../user-edit/user-edit.component";

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
        ]
    }
];