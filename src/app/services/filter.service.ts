import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs';


import 'rxjs/add/operator/map';


@Injectable()
export class FilterService {

  constructor(private _http: Http) { 

  }

  
  getCountries() : Observable<any> {

    return this._http.get("https://restcountries.eu/rest/v2/all")
    .map(res => 

        res.json().map(country => {
          return  {
              name: country.name,
              code : country.alpha3Code,
              continent : country.region,
              capital : country.capital
            }
      }));
  }

  getContinent() : Observable<any> {

    return this._http.get("https://restcountries.eu/rest/v2/all")
    .map(res => res.json());
  }


}

