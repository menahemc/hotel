import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/switchMap';
import { HcollectionService } from './Hcollection.service';
import { IHotel } from './../interfaces/IHotel';

@Component({
    selector: 'hotel-collapse',
    templateUrl: '../HTMLs/hotelCollaps.html',
    styleUrls: ['../Styles/hotelCollaps.css']
})

export class HotelCollapseComponent implements  OnChanges {
    @Input()
    hotel: IHotel;
    @Input()
    isEdit: boolean = false;
    @Input()
    localHotel:IHotel;

    localAmenities:any;
    localAddress:any;
    localDetails:any;
    localDescription:string;
    @Output()
      closeCollapse: EventEmitter<any>=new EventEmitter();

    constructor(private http: HcollectionService, private route: ActivatedRoute) {}
    ngOnChanges(changes: SimpleChanges) {
            this.localHotel = Object.assign({}, this.hotel);
            this.localAmenities=Object.assign([],this.hotel.amenities);
            this.localAddress=Object.assign({},this.hotel.address);
            this.localDetails=Object.assign({},this.hotel.details);
            this.localDescription=Object.assign(this.hotel.description);
    }

    onKeyPress(){
        console.log(this.hotel);
    }

    saveChanges(){
              this.hotel.address=  this.localAddress;
              this.hotel.description=this.localDescription;
              this.hotel.details=this.localDetails;
              this.close();
    }

    close(){
        this.closeCollapse.emit()
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
