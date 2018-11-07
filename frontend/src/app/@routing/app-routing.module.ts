import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ROUTES } from './routes';
/*import {
    CanActivateAccessGuard,
    CanActivateRoleGuard,
    CanActivateAuthGuard
 } from 'app/@common/activators';*/

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, {
            useHash: false,
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [
        RouterModule
    ],
    providers: [
        /*CanActivateAccessGuard,
        CanActivateRoleGuard,
        CanActivateAuthGuard*/
    ]
})
export class AppRoutingModule { }
