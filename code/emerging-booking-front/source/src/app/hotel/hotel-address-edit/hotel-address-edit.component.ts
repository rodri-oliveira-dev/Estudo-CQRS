import { Component, OnInit, Input } from '@angular/core';
import { HotelService } from '../shared/hotel.service';
import { HotelListItem, HotelAddress } from '../shared/hotel.model';

@Component({
    selector: 'app-hotel-address-edit',
    templateUrl: 'hotel-address-edit.component.html'
})
export class HotelAddressEditComponent implements OnInit {
    @Input() hotel: HotelListItem;

    payload: HotelAddress = {} as any;

    constructor(private service: HotelService) { }

    ngOnInit() {

    }

    save() {
        this.payload = {
            street: this.hotel.addressStreet,
            city: this.hotel.addressCity,
            country: this.hotel.addressCountry,
            district: this.hotel.addressDistrict,
            zipcode: this.hotel.zipCode
        };

        console.log(this.payload);

        this.service.patchHotelAddress(this.hotel.code, this.payload).subscribe(
            data => console.log(data),
            error => {
                console.log(error);
                window.alert('erro ao atualizar endererço');
            }
        );
    }
}
