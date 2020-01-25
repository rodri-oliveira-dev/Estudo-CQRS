import { Component, OnInit, Input } from '@angular/core';
import { HotelService } from '../shared/hotel.service';
import { HotelListItem, HotelAddress, HotelContact } from '../shared/hotel.model';

@Component({
    selector: 'app-hotel-contact-edit',
    templateUrl: 'hotel-contact-edit.component.html'
})
export class HotelContactEditComponent implements OnInit {
    @Input() hotel: HotelListItem;

    payload: HotelContact = {} as any;

    constructor(private service: HotelService) { }

    ngOnInit() {

    }

    save() {
        this.payload = {
            email : this.hotel.contactEmail,
            mobile: this.hotel.contactMobile,
            phone: this.hotel.contactPhone,
        };

        this.service.patchHotelContatc(this.hotel.code, this.payload).subscribe(
            data => console.log(data),
            error => {
                console.log(error);
                window.alert('erro ao atualizar contato');
            }
        );
    }
}
