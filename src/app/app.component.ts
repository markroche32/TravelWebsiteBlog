import { Component, OnInit, isDevMode, ChangeDetectorRef } from '@angular/core';
import { environment } from '../environments/environment';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showLoading : boolean = false;

  constructor(private cd: ChangeDetectorRef, private loaderService : LoaderService) { 

  }

  ngOnInit() {

    //Listen for changes on showLoading$
    this.loaderService.showLoading$.subscribe(
      showLoading => {
        this.showLoading = showLoading
        console.log("showLoading = " + this.showLoading)
        this.cd.detectChanges();

      });

    //Determine Mode
    if (isDevMode()) {
      console.log(' Development!');
      console.log("dev environment api url  " + environment.apiUrl);
    } else {
      console.log(' Production!');
    }

  }
}
