import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-individual-post',
  templateUrl: './individual-post.component.html',
  styleUrls: ['./individual-post.component.css']
})
export class IndividualPostComponent implements OnInit {

  private sub : any;
  id : number;
  post : any = {};
  serverImgPath : string;
  imageURL : string;
  
  constructor(private loaderService : LoaderService, 
    private postService: PostsService, 
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number   
   });

   this.imageURL = environment.apiUrl;
   this.getPost();

  }


  getPost(): void {

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

}
