import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from './material.module';

/**
 * Module main component
 */
import { SignInComponent } from './sign-in.component';

/**
 * Module children components
 */
import { SpinnerComponent } from './spinner';
import { LoginComponent } from './login';
import { AccountRecoveryComponent } from './account-recovery';
import { SignInRoutingModule } from './sign-in-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        CustomMaterialModule,
        SignInRoutingModule
    ],
    declarations: [
        SpinnerComponent,
        SignInComponent,
        LoginComponent,
        AccountRecoveryComponent
    ],
    exports: [ SignInRoutingModule ]
})
export class SignInModule {}
