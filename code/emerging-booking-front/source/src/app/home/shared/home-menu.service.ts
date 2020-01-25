import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu, MenuGroup } from '../../shared/directa-menu/directa-menu.model';
import { BookingComponent } from 'src/app/booking/booking.component';
import { HotelCreateComponent } from 'src/app/hotel/hotel-create/hotel-create.component';
import { HotelListComponent } from 'src/app/hotel/hotel-list/hotel-list.component';

@Injectable({ providedIn: 'root' })
export class MenuService {

    menu: Menu = new Menu();

    constructor(private httpClient: HttpClient) { }

    getMenu(): Menu {
        return this.menu.add([
            // Acesso

            MenuGroup.create('Gestão', 'fa-key')
                .newItem('Hoteis', HotelListComponent),

            MenuGroup.create('Reservas', 'fa-key')
                .newItem('Realizar Reserva', BookingComponent)

        ]);
    }
}

