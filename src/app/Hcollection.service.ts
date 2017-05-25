import { Http, Response, RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IHotel } from './../interfaces/IHotel';
import { Injectable } from '@angular/core'


@Injectable()
export class HcollectionService {
    hotelsUrl: string = "http://localhost:3000/hotels";
    brandsUrl: string = "http://localhost:3000/brands";
    constructor(private _http: Http) { }

    getHotels(): Observable<IHotel[]> {
        return this._http.get(this.hotelsUrl)
            .map((res: Response) => res.json())
            .catch(this.HandleError);
    }

    getBrands(): Observable<any[]> {
        return this._http.get(this.brandsUrl)
            .map((res: Response) => res.json())
            .catch(this.HandleError);
    }

    getHotelById(id: number): Observable<IHotel> {
        return this._http.get(this.hotelsUrl + '/' + id)
            .map((res: Response) => res.json())
            .catch(this.HandleError);
    }

    HandleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

}