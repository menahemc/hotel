import { IHotel } from './../interfaces/IHotel';
import { Injectable, Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'hotelListPipe',
})
@Injectable()
export class HotelListPipe implements PipeTransform {
    transform(items: any[], field: string, hotelName: string, brandProperty: string, brandVal: any): any {
        if (!items) return [];
        if (brandVal == 4) { 
            return items.filter(it => it[field].toUpperCase().includes(hotelName.toUpperCase()))
         }
        else {
            return items.filter(it => it[field].toUpperCase().includes(hotelName.toUpperCase()) && it[brandProperty].brand.val == brandVal)
        }
    }
}