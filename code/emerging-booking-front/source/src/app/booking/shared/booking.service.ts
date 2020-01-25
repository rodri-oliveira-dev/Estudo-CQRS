import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoomReservation, BookingResult } from './booking.models';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class BookingService {
    constructor(private httpClient: HttpClient) { }

    public booking(payload: RoomReservation) {
        return this.httpClient.post<BookingResult>(environment.urlBase + 'Booking', payload);
    }

    public detail(code: string) {
        return this.httpClient.get(environment.urlBase + `Booking/${code}/detail`);
    }

    public cancel(code: string) {
        return this.httpClient.delete(environment.urlBase + `Booking/${code}/cancel`);
    }
}
