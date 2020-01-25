import { NgModule } from '@angular/core';
import { DirectaMenuComponent } from './base/directa-menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { DirectaMenuLogoComponent } from './logo-area/directa-logo.component';


@NgModule({
    imports: [
        BrowserModule,
    ],
    exports: [
        DirectaMenuComponent,
        DirectaMenuLogoComponent
    ],
    declarations: [
        DirectaMenuComponent,
        DirectaMenuLogoComponent
    ],
    providers: [],
})
export class DirectaMenuModule { }
