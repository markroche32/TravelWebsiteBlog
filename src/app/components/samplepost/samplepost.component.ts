import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Post } from '../../post';
import { LoaderService } from '../../services/loader.service';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-samplepost',
  templateUrl: './samplepost.component.html',
  styleUrls: ['./samplepost.component.css']
})
export class SamplepostComponent implements OnInit {

  myPosts : Post[];
  user : User;
  imageURL : string;

  constructor(
    private loaderService : LoaderService, 
    private postService: PostsService, 
    private router: Router) { }

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

}
