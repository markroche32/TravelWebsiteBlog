import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../post';
import { Router } from '@angular/router';
import { User } from '../../user';
import { FilterService } from '../../services/filter.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  continent: any = [];
  countryData: any;
  model: any = {};
  posts: Post[];
  newPost: Post;
  user: User;
  selectedFile: File;
  post: Post = new Post();
  savePostError: boolean = false;
  savePostErrorMsg: string;

  constructor(private postService: PostsService, private router: Router,
    private filterService: FilterService, private loaderService : LoaderService) { }

  ngOnInit() {

    this.postService.getPosts().subscribe(
      posts => this.posts = posts,
      error => console.log(error)
    );

    this.user = JSON.parse(localStorage.getItem("currentUser"));
    console.log("Parsed user id = " + this.user.id);

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
 

  onFileSelected(event): void {

    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.size);
    console.log(this.selectedFile.name);

  }

  savePost(): void {

    this.model.user_id = this.user.id;
    console.log("Converted Model = " + this.model)
    console.log("Converted Model strinify= " + JSON.stringify(this.model));

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


  convertToPost(post: Post) {

    console.log("Converted User = " + JSON.stringify(post))
    console.log("Converted User ID = " + JSON.stringify(post.id));

  }


  uniqueContinent(country): void {

    country.forEach(element => {

      if (element.continent) {

        this.continent.includes(element.continent) ? null : this.continent.push(element.continent);
      }
    });

  }

}