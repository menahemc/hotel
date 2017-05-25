import { HcollectionService } from './Hcollection.service';
import { IHotel } from './../interfaces/IHotel';
import { Component, OnInit, EventEmitter } from '@angular/core';

import { HotelItemComponent } from './hotelItem.component';
import { RecentlyVisited } from './recentlyVisited.component';
import { IBrand } from './../interfaces/IBrand';
import { HotelListPipe } from './../Pipes/hotelList.pipe';



@Component({
    selector: 'hotel-list',
    styleUrls: ['../Styles/hotelList.css'],
    templateUrl: '../HTMLs/hotelList.html'
})

export class HotelListComponent implements OnInit {
    hotels: IHotel[];
    brands: IBrand[];
    recentlyHotels: any[];
    titel: string;

    radioVal: number;

    hotelNameFilter: any = { "name": '' };

    constructor(private http: HcollectionService) {
        this.titel = "";
        this.radioVal = 4;
    }

    ngOnInit() {
        this.http.getHotels()
            .subscribe(hotels => { this.hotels = hotels;  this.getRecentlyVisits() })

        this.http.getBrands()
            .subscribe(brands => { this.brands = brands; this.brands.push({ val: 4, txt: "All Brands" }); })
    }
    deleteHotelByIndex(index: number) {
        this.hotels.splice(index, 1);
        this.hotels = Object.assign([], this.hotels);
    }
    onChange(value: number) {
        this.radioVal = value;
    }

     getRecentlyVisits() {
         let visits = [];
         let recentlyHotels = [];
         let d;
         let visitsStr:string;
         visitsStr=localStorage.getItem('recentlyVisits');
         if(visitsStr=="" || visitsStr==null){
             return;
         }
         visits = JSON.parse(visitsStr);
         for (let i = 0; i < visits.length; i++) {
             for (let h of this.hotels) {
                 if (h.id == visits[i].hotelID) {
                     d = new Date(visits[i].lastVisitDate);
                     let day = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
                     let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                     recentlyHotels.push({ "hotel": h, "date": { "day": day, "time": time } });
                     break;
                 }
             }
         }
         this.recentlyHotels = recentlyHotels;
     }
}