import { NgModule } from '@angular/core';

import { DirectaCloseModalComponent } from './base-close-modal/directa-close-modal.component';
import { DirectaSubmitCloseModalComponent } from './base-submit-close-modal/directa-submit-close-modal.component';

@NgModule({
    imports: [],
    exports: [
        DirectaCloseModalComponent,
        DirectaSubmitCloseModalComponent
    ],
    declarations: [
        DirectaCloseModalComponent,
        DirectaSubmitCloseModalComponent
    ],
    providers: [
        DirectaCloseModalComponent,
        DirectaSubmitCloseModalComponent
    ],
    entryComponents: [
        DirectaCloseModalComponent,
        DirectaSubmitCloseModalComponent
    ]
})
export class DirectaModalModule { }
