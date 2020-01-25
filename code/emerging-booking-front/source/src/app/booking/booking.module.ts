import { NgModule } from '@angular/core';
import { BookingComponent } from './booking.component';
import { DirectaFormModule } from '../shared/directa-form/directa-form.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdDirective } from '../shared/directives/ad-directive';


@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        DirectaFormModule,
        ReactiveFormsModule
    ],
    exports: [
        BookingComponent
    ],
    declarations: [
        BookingComponent
    ],
    providers: [
        AdDirective,
        DirectaFormModule
    ],
    entryComponents: [
        BookingComponent
    ]
})
export class BookingModule { }
