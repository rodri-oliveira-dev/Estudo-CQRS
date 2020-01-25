import { Component, OnInit } from '@angular/core';
import { HotelService } from '../shared/hotel.service';
import { HotelListItem, RoomListItem, Hotel, HotelRoom } from '../shared/hotel.model';
import { DirectaFormComponent } from 'src/app/shared/directa-form/base/directa-form.component';
import { HomeHostService } from 'src/app/home/shared/home-host.service';
import { HotelCreateComponent } from '../hotel-create/hotel-create.component';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
  providers: [HotelService, HomeHostService]
})
export class HotelListComponent extends DirectaFormComponent implements OnInit {
  items: HotelListItem[] = [];
  currentSelectedRooms: RoomListItem[] = [];
  currentHotel: HotelListItem = {} as any;
  currentHotelEdit: HotelListItem = {} as any;
  interval;

  constructor(private service: HotelService, private host: HomeHostService) { super(); }

  ngOnInit() {
    this.loadHotels();
    this.startTimer();
  }

  loadHotels() {
    this.service.getHotels().subscribe(
      data => { this.items = data; },
      error => { window.alert('erro ao recuperar hoteis'); }
    );
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.loadHotels();
    }, 5000);
  }

  getRooms(hotel: HotelListItem) {
    this.currentHotel = hotel;
    this.currentHotelEdit = hotel;

    this.service.getRooms(hotel.code).subscribe(
      data => { this.currentSelectedRooms = data; },
      error => { window.alert('erro ao recuperar quartos do hotel'); }
    );
  }

  setCurrentHotel(hotel: HotelListItem) {
    this.currentHotel = hotel;
    this.currentHotelEdit = hotel;
  }

  newHotel() {
    const form = this.host.create(this.adHost, HotelCreateComponent);

    form.closeForm.subscribe(() => {
      this.loadHotels();
    });
  }
}
