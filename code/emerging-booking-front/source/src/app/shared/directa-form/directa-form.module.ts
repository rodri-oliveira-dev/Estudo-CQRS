import { NgModule } from '@angular/core';
import { DirectaFormComponent } from './base/directa-form.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
    imports: [
        CommonModule,
        DragDropModule
    ],
    exports: [
        DirectaFormComponent
    ],
    declarations: [
        DirectaFormComponent
    ],
    providers: [
        DirectaFormComponent
    ],
    entryComponents: [DirectaFormComponent],
})
export class DirectaFormModule { }

