import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { User } from '../user';
import { Observable} from 'rxjs';

import 'rxjs/add/operator/map';

@Injectable()
export class SignupService {

    constructor(private _http: Http) { 
        
    }

    saveUser(user): Observable<User> {
    
       let headers = new Headers({ 'Content-Type': 'application/json' });
       let options = new RequestOptions({ headers: headers });
    
       return this._http.post("http://localhost:3000/adduser", JSON.stringify(user), options)
       .map(res => res.json());
   }

   getUsers() : Observable<User[]> {

    return this._http.get("http://localhost:3000/")
    .map(res => res.json());

   }


   login(usernme, password) : Observable<User> {
    
        return this._http.get("http://localhost:3000/usernamePassword/" + usernme + "/" + password )
        .map(res => {
            
            return (<any>res)._body === '' ? {} : res.json();
                        
        });
    }
    

}