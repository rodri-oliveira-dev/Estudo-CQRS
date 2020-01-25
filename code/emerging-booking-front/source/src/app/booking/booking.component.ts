import { Component, OnInit } from '@angular/core';
import { DirectaFormComponent } from '../shared/directa-form/base/directa-form.component';
import { HomeHostService } from '../home/shared/home-host.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [HomeHostService]
})
export class BookingComponent extends DirectaFormComponent implements OnInit{

  constructor(private appHostService: HomeHostService) {
    super();

  }

  ngOnInit() {

  }
}
