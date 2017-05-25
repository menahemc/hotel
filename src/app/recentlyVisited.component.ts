import { Component,  Input } from '@angular/core';
import {  Router } from '@angular/router';

import { IHotel } from './../interfaces/IHotel';



@Component({
    selector: 'recently-visited',
    templateUrl: '../HTMLs/recentlyVisited.html',
    styleUrls:['../Styles/recentlyVisited.css']
})

export class RecentlyVisited {
    @Input()
    recentlyHotels: IHotel[];
    @Input()
    currentHotel:IHotel;

    constructor(private router: Router){}
    routeToHotelScreen(h) {
        console.log(h.hotel);
         this.router.navigate(['/hotel-screen', h.hotel.id]);
    }
}


