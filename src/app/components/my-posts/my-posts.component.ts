import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Post } from '../../post';
import { User } from '../../user';
import { environment } from '../../../environments/environment';
import { LoaderService } from '../../services/loader.service';


@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

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
    this.user = JSON.parse(localStorage.getItem("currentUser"));

    this.postService.getPosts().subscribe(
      posts => {
        this.myPosts = posts.filter(p => p.user_id == this.user.id);
        this.loaderService.showOverlay(false);
        }, 
      error => {
        console.log(error);
        this.loaderService.showOverlay(false);
      });

  }


  deletePost(id : number): void {

    console.log("Posts before delete" + this.myPosts.length);

    if (confirm("Are you sure to delete Post")) {

      this.loaderService.showOverlay(true);

      this.postService.deletePost(id).subscribe(
        response => {
          this.myPosts = this.myPosts.filter(post => post.id !== id);
          console.log("Post Successsfully Deleted" + response);
          console.log("Posts after delete" + this.myPosts.length);
          this.loaderService.showOverlay(false);
          }, 
        error => {
          console.log(error);
          this.loaderService.showOverlay(false);
        });

    }
  }

}
