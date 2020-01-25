import { Component, OnInit } from '@angular/core';
import { Hotel } from './shared/hotel.model';
import { DirectaFormComponent } from '../shared/directa-form/base/directa-form.component';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent extends DirectaFormComponent implements OnInit {

  payload: Hotel = {} as any;

  constructor() {
    super();
   }

  ngOnInit() {
    
  }

}
