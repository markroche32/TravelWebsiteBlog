import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { LoaderService } from '../../services/loader.service';
import { FilterService } from '../../services/filter.service';
import { environment } from '../../../environments/environment';
import { User } from '../../user';
import { Post } from '../../post';

@Component({
  selector: 'app-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.css']
})
export class PostsFilterComponent implements OnInit {

  continent : any = [];
  countryData: any;
  myPosts : Post[];
  imageURL : string;
  user : User;
  selectedFilter:string;

  constructor(  private loaderService : LoaderService, 
    private postService: PostsService, private filterService : FilterService) { 

      this.selectedFilter='Europe';

    }

     
    countryChanged(selectedValue:string) {

      console.log('country is ', selectedValue);

   }

   continentChanged(selectedValue:string) {
    
          console.log('continent is ', selectedValue);
    }

   ngOnInit() {

    this.loaderService.showOverlay(true);
    
        console.log("dev environment api url  " + environment.apiUrl);
        
        this.imageURL = environment.apiUrl;
        this.user = JSON.parse(localStorage.getItem("currentUser"));
    
        this.postService.getPosts().subscribe(
          posts => {
            this.myPosts = posts.filter(p => p.created);
            this.loaderService.showOverlay(false);
            }, 
          error => {
            console.log(error);
            this.loaderService.showOverlay(false);
          });

          this.filterService.getCountries().subscribe(
      
            data => {
            console.log(data);
            this.countryData = data;
            this.uniqueContinent(data);
          },
          error => {
          console.log(error);
          this.loaderService.showOverlay(false);
   
          });  
        
  }

  
  uniqueContinent(country) : void {

    country.forEach(element => {
         
      if(element.continent){
      
        this.continent.includes(element.continent) ? null : this.continent.push(element.continent);
      }
    });

  }
}
