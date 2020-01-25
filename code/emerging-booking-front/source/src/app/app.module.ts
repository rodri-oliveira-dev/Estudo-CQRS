import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DirectaFrameworkModule } from './shared/directa-framework.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { LoggedInGuard } from './core/logged-in.guard';
import { HeaderInterceptor } from './core/http.interceptor';
import { BookingModule } from './booking/booking.module';
import { HotelComponent } from './hotel/hotel.component';
import { HotelCreateComponent } from './hotel/hotel-create/hotel-create.component';
import { HotelModule } from './hotel/hotel.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DirectaFrameworkModule,
    BookingModule,
    HotelModule,
    LoginModule,
    HomeModule,
    AppRoutingModule
  ],
  providers: [LoggedInGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
