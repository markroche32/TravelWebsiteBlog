import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { LoaderService } from '../../services/loader.service';
import { environment } from '../../../environments/environment';
import { User } from '../../user';
import { Post } from '../../post';

@Component({
  selector: 'app-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.css']
})
export class PostsFilterComponent implements OnInit {

  myPosts : Post[];
  //@Input() filter: number;
  imageURL : string;
  user : User;
  selectedFilter:string;

  public filterTypes = [
      {value:'Asia', display:'Asia', submenu:["China","Japan", "Vietnam"]},
      {value:'Europe', display:'Europe', submenu:["Ireland","Spain", "Italy"]}, 
      {value:'America', display:'America', submenu:["USA","Canada", "Hondurus"]}, 
      {value:'Africa', display:'Africa', submenu:["Ireland","Spain", "Italy"]},
      {value:'Australia', display:'Australia',submenu:["Australia","New Zealand", "Tazmania"]}
 ];
  
  constructor(  private loaderService : LoaderService, 
    private postService: PostsService) { 

      this.selectedFilter='Europe';

    }

     filterChanged(selectedValue:string){

   
      console.log('value is ',selectedValue);

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
  }

}
