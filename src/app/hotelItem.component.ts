import { IHotel } from './../interfaces/IHotel';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmOptions, Position } from 'angular2-bootstrap-confirm';
import { Positioning } from 'angular2-bootstrap-confirm/position';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HotelScreenComponent } from './hotelScreen.component';



@Component({
  selector: '[hotel-item]',
  templateUrl: '../HTMLs/hotelItem.html',
  styleUrls: ['../Styles/hotelItem.css'],
  providers: [ConfirmOptions, { provide: Position, useClass: Positioning }, ModalComponent]
})

export class HotelItemComponent {
  @Input()
  hotel: IHotel;
  hotelImges: string[];
  isCollapseOpen: boolean;
  isEdit: boolean;

  @Input()
  index: number

  @Output()
  deletedItem: EventEmitter<number> = new EventEmitter();
  @Output()
  endOfVisit: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.isCollapseOpen = false;
    this.isEdit = false;
  }
  
  deletHotel() {
    this.deletedItem.emit(this.index);
  }
  
  onEditClick() {
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.isCollapseOpen = true;
    }
  }

  checkVisit() {
    this.isCollapseOpen = !this.isCollapseOpen;
    this.isEdit = false;
    if (this.isCollapseOpen) {
      this.createVisit();
    }
    else {
      this.endOfVisit.emit();
      this.isEdit = false;
    }
  }

  createVisit(): void {
    let recentlyVisits: any[] = new Array();
    let recentlyVisitsStr = localStorage.getItem('recentlyVisits');
    if (recentlyVisitsStr == null || recentlyVisitsStr == "") {
      recentlyVisits = new Array();
      recentlyVisits.unshift({ hotelID: this.hotel.id, lastVisitDate: new Date() });
    }
    else {
      recentlyVisits = JSON.parse(recentlyVisitsStr);
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

  closeCollapse() {
    this.isCollapseOpen = false;
    if (this.isEdit) {
      this.isEdit = false;
    }
  }
}
