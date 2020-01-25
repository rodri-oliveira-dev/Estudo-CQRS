import { NgModule } from '@angular/core';
import { DirectaFormModule } from './directa-form/directa-form.module';
import { AdDirective } from './directives/ad-directive';
import { DirectaMenuModule } from './directa-menu/directa-menu.module';


@NgModule({
    imports: [
    ],
    exports: [
        DirectaFormModule,
        DirectaMenuModule,
        AdDirective,
        DirectaMenuModule
    ],
    declarations: [
        AdDirective,
    ],
    providers: [
        AdDirective,
        DirectaFormModule,
    ],
})
export class DirectaFrameworkModule { }
