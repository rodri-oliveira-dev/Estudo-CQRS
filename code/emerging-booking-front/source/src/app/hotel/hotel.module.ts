import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DirectaFormModule } from '../shared/directa-form/directa-form.module';
import { HotelComponent } from './hotel.component';
import { HotelCreateComponent } from './hotel-create/hotel-create.component';
import { AdDirective } from '../shared/directives/ad-directive';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomCreateComponent } from './room-create/room-create.component';
import { HotelStarsComponent } from './hotel-stars/hotel-stars.component';
import { HotelAddressEditComponent } from './hotel-address-edit/hotel-address-edit.component';
import { HotelContactEditComponent } from './hotel-contact-edit/hotel-contact-edit.compact';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    DirectaFormModule,
    ReactiveFormsModule
  ],
  exports: [
    HotelComponent,
    HotelAddressEditComponent,
    HotelContactEditComponent,
    HotelCreateComponent,
    HotelListComponent,
    HotelStarsComponent,
    RoomListComponent,
    RoomCreateComponent
  ],
  declarations: [
    HotelComponent,
    HotelAddressEditComponent,
    HotelContactEditComponent,
    HotelCreateComponent,
    HotelListComponent,
    HotelStarsComponent,
    RoomListComponent,
    RoomCreateComponent
  ],
  providers: [
    AdDirective,
    DirectaFormModule
  ],
  entryComponents: [
    HotelComponent,
    HotelCreateComponent,
    HotelListComponent
  ]
})
export class HotelModule { }
