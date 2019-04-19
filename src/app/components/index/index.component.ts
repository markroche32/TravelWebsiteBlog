import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Post } from '../../post';
import { LoaderService } from '../../services/loader.service';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  myPosts : Post[];
  user : User;
  imageURL : string;
  startPage : Number;
  paginationLimit:Number; 

  constructor(
    private loaderService : LoaderService, 
    private postService: PostsService, 
    private router: Router) {

      this.startPage = 0;
      this.paginationLimit = 3;
     }

  ngOnInit() {

    this.loaderService.showOverlay(true);
    
        console.log("dev environment api url  " + environment.apiUrl);
        
        this.imageURL = environment.apiUrl;
    
        this.postService.getPosts().subscribe(
          posts => {
            this.myPosts = posts;
            this.loaderService.showOverlay(false);
            }, 
          error => {
            console.log(error);
            this.loaderService.showOverlay(false);
          });

  }

  showMoreItems() : void
  {
     this.paginationLimit = Number(this.paginationLimit) + 3;        
  }
  showLessItems() : void 
  {
    this.paginationLimit = Number(this.paginationLimit) - 3;
  }

}
