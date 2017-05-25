import { HotelListComponent } from './hotelList.component';
import { HcollectionPage } from './../../e2e/app.po';
import { Component, OnInit } from '@angular/core';

import {HcollectionService} from './Hcollection.service';

@Component({
  selector: 'app-root',
  template:`<router-outlet></router-outlet>`,
})
export class AppComponent{
  title = 'app works!';
}
