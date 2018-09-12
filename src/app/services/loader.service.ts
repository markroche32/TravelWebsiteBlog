import { Injectable, Inject } from '@angular/core';
import { Observable, Subject} from 'rxjs';

import 'rxjs/add/operator/map';

@Injectable()
export class LoaderService {

  // observable source
  private showLoadingSource = new Subject<boolean>();
 
  // observable stream
  showLoading$ = this.showLoadingSource.asObservable();

    constructor() { 
        
    }

    showOverlay(showLoading: boolean) {

        this.showLoadingSource.next(showLoading);
    }

}