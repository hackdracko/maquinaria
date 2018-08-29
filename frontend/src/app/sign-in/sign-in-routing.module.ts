import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in.component';
import { LoginComponent } from './login';
import { AccountRecoveryComponent } from './account-recovery';

const ROUTES: Routes = [
    { path: '', component: SignInComponent, children: [
        { path: '', component: LoginComponent },
        { path: 'login', component: LoginComponent },
        { path: 'account-recovery', component: AccountRecoveryComponent },
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(ROUTES) ],
    exports: [ RouterModule ]
})
export class SignInRoutingModule {}