import { Routes } from '@angular/router';
import { NoContentComponent } from '../no-content/';
/*import {
    CanActivateAccessGuard,
    CanActivateRoleGuard,
    CanActivateAuthGuard
 } from 'app/@common/activators';*/

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },

    {
        path: 'auth',
        //canActivate: [CanActivateAuthGuard],
        loadChildren: '../auth/auth.module#AuthModule'
    },

    /*{
        path: 'administrador',
        canActivate: [CanActivateAccessGuard, CanActivateRoleGuard],
        data: {
            expectedRole: ['administrador']
        },
        loadChildren: 'app/administrator/administrator.module#AdministratorModule'
    },

    {
        path: 'vendedor',
        canActivate: [CanActivateAccessGuard, CanActivateRoleGuard],
        data: {
            expectedRole: ['vendedor']
        },
        loadChildren: 'app/seller/seller.module#SellerModule'
     },*/

    { path: '**', component: NoContentComponent }

];
