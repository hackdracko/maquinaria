import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule
} from '@angular/material';
import {AuthRoutingModule} from "./@routing/auth-routing.module";
import {PasswordRecoveryComponent} from "./password-recovery/password-recovery.component";
import {DialogPasswordRecoveryComponent} from "./password-recovery/dialog-password-recovery/dialog.password-recovery.component";

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
    ],
    declarations: [
        LoginComponent,
        PasswordRecoveryComponent,
        DialogPasswordRecoveryComponent,
    ]
})
export class AuthModule {
}
