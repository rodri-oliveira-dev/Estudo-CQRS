import { Component, OnInit } from '@angular/core';
import { DirectaFormComponent } from 'src/app/shared/directa-form/base/directa-form.component';
import { Hotel, HotelResult } from '../shared/hotel.model';
import { HotelService } from '../shared/hotel.service';

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styleUrls: ['./hotel-create.component.css'],
  providers: [HotelService]
})
export class HotelCreateComponent extends DirectaFormComponent implements OnInit {
  payload: Hotel = {} as any;

  constructor(private service: HotelService) { super(); }

  ngOnInit() {
    this.payload.starsOfCategory = 1;
  }

  public save() {
    this.service.addHotel(this.payload).subscribe(
      (data: HotelResult) => this.saveOnSucess(data),
      (error) => this.saveOnError(error)
    );
  }

  private saveOnSucess(result: HotelResult) {
    this.close();
  }

  private saveOnError(error: any) {
    window.alert(error.statusText);
  }
}
