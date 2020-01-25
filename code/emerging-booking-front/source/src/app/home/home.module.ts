import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { DirectaFrameworkModule } from '../shared/directa-framework.module';
import { HomeComponent } from './home.component';
import { LoginModule } from '../login/login.module';
import { DirectaModalModule } from '../shared/directa-modal/directa-modal.module';
import { HomeHostService } from './shared/home-host.service';
import { BookingModule } from '../booking/booking.module';
import { HotelModule } from '../hotel/hotel.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BookingModule,
    HotelModule,
    DirectaFrameworkModule,
    LoginModule,
    DirectaModalModule
  ],
  providers: [HomeHostService],
})
export class HomeModule { }
