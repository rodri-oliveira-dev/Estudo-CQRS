import { Component, OnInit, Input } from '@angular/core';
import { RoomListItem, HotelListItem } from '../shared/hotel.model';
import { BookingService } from 'src/app/booking/shared/booking.service';
import { RoomReservation } from 'src/app/booking/shared/booking.models';

@Component({
    selector: 'app-room-list',
    templateUrl: 'room-list.component.html',
    providers: [BookingService]
})
export class RoomListComponent implements OnInit {
    @Input() rooms: RoomListItem[] = [];
    @Input() hotel: HotelListItem = {} as any;

    payload: RoomReservation = {} as any;
    currentRoom: RoomListItem;

    checkingDate =  new Date('d-m-Y');
    checkoutDate = new Date('d-m-Y');

    constructor(private service: BookingService) { }

    ngOnInit() {
        this.newPayload();
    }

    newPayload(){
        this.payload.numberOfGuests = 1;
        this.payload.breakfastIncluded = true;
        this.checkingDate = new Date('d-m-Y');
        this.checkoutDate = new Date('d-m-Y');
    }

    booking(room: RoomListItem) {
        console.log(room);
        this.currentRoom = room;
    }

    reservation() {
        console.log(this.currentRoom);
        this.payload.roomCode = this.currentRoom.code;
        this.payload.hotelCode = this.hotel.code;
        this.payload.checkingDate = this.checkingDate.toString();
        this.payload.checkoutDate = this.checkoutDate.toString();

        this.service.booking(this.payload).subscribe(
            data => {
                window.alert('sucess');
                this.newPayload();
            },
            error => {
                console.log(error);
                window.alert(error.error.errorMessage);
                this.newPayload();
            }
        );
    }
}
