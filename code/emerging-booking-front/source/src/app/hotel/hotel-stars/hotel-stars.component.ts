import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-hotel-stars',
    template: `
    <i *ngIf="starsOfCategory >= 1" class="fas fa-star"></i>
    <i *ngIf="starsOfCategory >= 2" class="fas fa-star"></i>
    <i *ngIf="starsOfCategory >= 3" class="fas fa-star"></i>
    <i *ngIf="starsOfCategory >= 4" class="fas fa-star"></i>
    <i *ngIf="starsOfCategory >= 5" class="fas fa-star"></i>`
})
export class HotelStarsComponent implements OnInit {
    @Input() starsOfCategory = 1;

    constructor() { }

    ngOnInit() { }
}
