import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './signin.component';


@NgModule({
    imports: [
        FormsModule,
        BrowserModule
    ],
    exports: [
        LoginComponent,
        SigninComponent
    ],
    declarations: [
        LoginComponent,
        SigninComponent
    ],
    providers: [],
})
export class LoginModule { }
