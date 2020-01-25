import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel, HotelResult, HotelAddress, HotelRoom, HotelListItem, RoomListItem, HotelContact } from './hotel.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HotelService {
    constructor(private httpClient: HttpClient) { }

    public getHotels() {
        return this.httpClient.get<HotelListItem[]>(environment.urlBase + 'Hotel');
    }

    public getRooms(code: string) {
        return this.httpClient.get<RoomListItem[]>(environment.urlBase + `Hotel/${code}/rooms`);
    }

    public addHotel(payload: Hotel) {
        return this.httpClient.post<HotelResult>(environment.urlBase + 'Hotel', payload);
    }

    public patchHotelAddress(code: string, payload: HotelAddress) {
        return this.httpClient.patch(environment.urlBase + `Hotel/${code}/address/update`, payload);
    }

    public patchHotelContatc(code: string, payload: HotelContact) {
        return this.httpClient.patch(environment.urlBase + `Hotel/${code}/contacts/update`, payload);
    }

    public addRoom(code: string, payload: HotelRoom) {
        console.log(payload);
        return this.httpClient.post(environment.urlBase + `Hotel/${code}/room`, payload);
    }
}
