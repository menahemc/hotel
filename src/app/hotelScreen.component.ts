import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/switchMap';
import { HcollectionService } from './Hcollection.service';
import { IHotel } from './../interfaces/IHotel';


@Component({
    selector: 'hotel-screen',
    templateUrl: '../HTMLs/hotelScreen.html',
    styleUrls: ['../Styles/hotelScreen.css']
})

export class HotelScreenComponent implements OnInit {
    hotel: IHotel;
    editTxt:string;
    oldFieldValue: string;
    @Output()
    saveChange: EventEmitter<number> = new EventEmitter();

    constructor(private http: HcollectionService, private route: ActivatedRoute) {}


    ngOnInit() {
        this.getCurrentHotel();
    }
    getCurrentHotel() {
        this.route.params
            .switchMap((params: Params) =>
                this.http.getHotelById(+params['id']))
            .subscribe(hotel => {
                this.hotel = hotel; 
                this.createVisit();
            });
    }
    createVisit(): void {
        var recentlyVisits: any[] = new Array();
        recentlyVisits = JSON.parse(localStorage.getItem('recentlyVisits'))
        if (recentlyVisits == null) {
            recentlyVisits = new Array();
            recentlyVisits.unshift({ hotelID: this.hotel.id, lastVisitDate: new Date() });
        }
        else {
            let index = this.hotelExistOnVisits(this.hotel.id, recentlyVisits);
            if (index != -1) {
                recentlyVisits.splice(index, 1);
            }
            recentlyVisits.unshift({ hotelID: this.hotel.id, lastVisitDate: new Date() });
        }
        if (recentlyVisits.length > 5) {
            recentlyVisits.splice(recentlyVisits.length - 1, 1);
        }
        localStorage.setItem('recentlyVisits', JSON.stringify(recentlyVisits));

    }
    hotelExistOnVisits(id: number, visits: any[]): number {
        for (let i = 0; i < visits.length; i++) {
            if (visits[i].hotelID == id) {
                return i;
            }
        }
        return -1;
    }

   
   

   
   

}
