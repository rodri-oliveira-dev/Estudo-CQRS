import { Component, OnInit, Input } from '@angular/core';
import { HotelService } from '../shared/hotel.service';
import { HotelListItem, HotelRoom } from '../shared/hotel.model';
import { HomeHostService } from 'src/app/home/shared/home-host.service';

@Component({
    selector: 'app-room-create',
    templateUrl: 'room-create.component.html'
})

export class RoomCreateComponent implements OnInit {
    @Input() currentHotel: HotelListItem = {} as any;

    newHotelRoom: HotelRoom = {} as any;

    constructor(private service: HotelService, private host: HomeHostService) { }

    ngOnInit() { }

    saveRooms() {
        this.service.addRoom(this.currentHotel.code, this.newHotelRoom).subscribe(
            data => { window.alert('Success'); },
            error => { window.alert('erro ao salvar quartos do hotel'); }
        );
    }
}
