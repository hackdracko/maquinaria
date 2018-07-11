import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-dialog-password-recovery',
    templateUrl: './dialog.password-recovery.component.html',
})
export class DialogPasswordRecoveryComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogPasswordRecoveryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

}
