import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { LocalStorageModule } from 'angular-2-local-storage';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HotelListPipe } from './../Pipes/hotelList.pipe'

import { HcollectionService } from './Hcollection.service';
import { AppComponent } from './app.component';
import { HotelListComponent } from './hotelList.component';
import { HotelItemComponent } from './hotelItem.component';
import { HotelScreenComponent } from './hotelScreen.component';
import { RecentlyVisited } from './recentlyVisited.component';
import {HotelCollapseComponent} from './hotelCollapse.component';



const appRoute: Routes = [
  { path: '', redirectTo: 'hotel-list', pathMatch: 'full' },
  { path: 'hotel-list', component: HotelListComponent },
  { path: 'hotel-item', component: HotelItemComponent },
  { path: 'hotel-screen/:id', component: HotelScreenComponent },
  { path: 'hotel-screen/:id/:isEdit', component: HotelScreenComponent }

]


@NgModule({
  declarations: [
    AppComponent, HotelListComponent, HotelItemComponent, HotelListPipe, HotelScreenComponent, RecentlyVisited,HotelCollapseComponent
  ],
  imports: [
    RouterModule.forRoot(appRoute),
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    // ConfirmModule,
    Ng2FilterPipeModule,
    // Ng2Bs3ModalModule ,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    })
  ],
  providers: [HcollectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
