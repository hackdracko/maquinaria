import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import {PasswordRecoveryComponent} from "../password-recovery/password-recovery.component";

export const ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'password-recovery', component: PasswordRecoveryComponent },
            //{ path: 'logout', component: LogoutComponent },
        ]
    }
];
