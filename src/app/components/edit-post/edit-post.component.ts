import { Component, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../post';
import { PostsService } from '../../services/posts.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  private sub : any;
  id : number;
  post : any = {};
  selectedFile : File;
  savePostError : boolean = false;
  savePostErrorMsg : string;
  serverImgPath : string;
  imageURL : string;

  constructor(private loaderService : LoaderService, private postService: PostsService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number   
    });

    this.imageURL = environment.apiUrl;
    this.getPost();
    
  }

  onFileSelected(event) : void {
         
    this.selectedFile = event.target.files[0]; 
    this.imageURL = this.selectedFile.name;

    //Render the Image in UI as preview
    let reader = new FileReader();    
    reader.onload = (e: any) => {
             
      this.imageURL = e.target.result;
    }
    
    reader.readAsDataURL(event.target.files[0]);
    
    console.log(this.selectedFile.size);     
    console.log(this.selectedFile.name);
 }
    

  getPost() : void {

    this.loaderService.showOverlay(true);

    this.postService.getPost(this.id)
    .subscribe(post => {
      this.post = post;
      this.imageURL = this.imageURL + post.imagepath;
      this.serverImgPath = post.imagepath;
      this.loaderService.showOverlay(false);
    },
    error => {
      console.log(error);
      this.loaderService.showOverlay(false);
    });
  }

  savePost() : void {
    
    this.selectedFile == null ? this.editPostImageNotChanged() : this.editPostImageChanged();
    this.convertToPost(this.post);

  }

  editPostImageNotChanged() : void {

    this.postService.editPostImageNotChanged(this.post).subscribe(
      post => { 
      this.post = post;
      //this.router.navigate(['/index']);
    },
    error => {
      console.log(error);
      this.savePostError = true;
      this.savePostErrorMsg = error;
    });
      
  }
    
  editPostImageChanged() : void {

    this.postService.savePost(this.post, this.selectedFile).subscribe(
      post => { 
      this.post = post;
      //this.router.navigate(['/index']);
    },
    error => {
      console.log(error);
      this.savePostError = true;
      this.savePostErrorMsg = error;
    });
  }

  convertToPost(post : Post) {
    
    console.log("Converted User = " + JSON.stringify(post))            
    console.log("Converted User ID = " + JSON.stringify(post.id));
  }

}
