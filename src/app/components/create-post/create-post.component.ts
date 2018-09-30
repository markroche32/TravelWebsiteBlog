import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../post';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  
    model : any = {};
    posts : Post[];
    newPost : Post;
    user: User;
    selectedFile : File;
    post : Post = new Post();
    savePostError : boolean = false;
    savePostErrorMsg : string;

    constructor(private postService: PostsService, private router: Router) { }
  
    ngOnInit() {
    
      this.postService.getPosts().subscribe(
        posts => this.posts = posts,
        error => console.log(error)
      );

      this.user = JSON.parse(localStorage.getItem("currentUser"));
      console.log("Parsed user id = " + this.user.id); 
    
    }
  
    onFileSelected(event) : void {

      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile.size);
      console.log(this.selectedFile.name);

    }

    savePost() : void {

      this.model.user_id = this.user.id;

      this.post.user_id = this.user.id;
      this.post.title = this.model.title;
      this.post.destination = this.model.destination;
      this.post.experience = this.model.experience;

        this.postService.savePost(this.post, this.selectedFile).subscribe(
            newPost => { 
            this.newPost = newPost;
            this.router.navigate(['/my-posts']);
          },
          error => {
            console.log(error);
            this.savePostError = true;
            this.savePostErrorMsg = error;
          });

        this.convertToPost(this.model);
      }


      convertToPost (post : Post) {
                  
        console.log("Converted User = " + JSON.stringify(post))            
        console.log("Converted User ID = " + JSON.stringify(post.id));
        
       }
     
    }