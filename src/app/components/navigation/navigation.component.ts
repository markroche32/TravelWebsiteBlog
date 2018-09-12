import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {

  headingText: String;
  loggedIn = false;
   x : number;

  constructor(private location: Location, private router: Router) { 

    this.router.events.subscribe((val) => {

      this.setHeading(location.path());
    
      this.loggedIn = localStorage.getItem("currentUser") != null || false;

      console.log("logged in  = " + this.loggedIn);
     
    });

  }

  ngOnInit() {
  
    this.loggedIn = false;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedIn = false;
    this.router.navigate(['/index']);
  }

  setHeading (heading : String) : void {

    switch(heading) { 
       case "/index": { 
          this.headingText = "A Clean Blog Theme by Start Bootstrap";
          console.log(this.headingText);
          break; 
       } 
       case "/about": { 
          this.headingText = "This is what I do";
          console.log(this.headingText);
          break; 
       } 
       case "/post": {
          this.headingText = "Problems look mighty small from 150 miles up";
          console.log(this.headingText);
          break;    
       } 
       case "/contact": { 
          this.headingText = "Have questions? I have answers (maybe).";
          console.log(this.headingText); 
          break; 
       }  
       case "/login": { 
        this.headingText = "Login page";
        console.log(this.headingText); 
        break; 
       }  
       case "/signup": { 
        this.headingText = "Signup page";
        console.log(this.headingText); 
        break; 
       }
       case "/create-post": { 
        this.headingText = "Create Post page";
        console.log(this.headingText); 
        break; 
       }   
       default: { 
          this.headingText = "A Clean Blog Theme by Start Bootstrap";
          console.log("default = " + this.headingText); 
          break;              
       } 
    }

  }
}