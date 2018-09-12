import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model : any = {};
  uniqueUser: boolean ;
  users : User[];
  newUser : User;

  constructor(private loaderService : LoaderService, private signupService: SignupService, private router: Router) { }

  ngOnInit() {
    
    this.uniqueUser = true;
    this.signupService.getUsers().subscribe(
      users => this.users = users,
      error => console.log(error)
    );
  
  }

  submit() : void {

    this.users.forEach( user => {
      if(user.username == this.model.username || user.password == this.model.password){
        this.uniqueUser = false;
      }
    });

    //If Unique User => Save to database => !uniqueUser will display message
    if(this.uniqueUser){

      this.loaderService.showOverlay(true);

      this.signupService.saveUser(this.model).subscribe(
        newUser => { 
          this.newUser = newUser;
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          this.loaderService.showOverlay(false);
          this.router.navigate(['/index']);
        },
        error => {
          console.log(error);
          this.loaderService.showOverlay(false);
        });
    }
   
  }

  convertToUser (person : User) {

    console.log("Converted User = " + JSON.stringify(person));
    console.log("Converted User ID = " + JSON.stringify(person.id));

  }

}
