import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs';

import 'rxjs/add/operator/map';
import { Post } from '../post';

@Injectable()
export class PostsService {

    constructor(private _http: Http) { 
        
    }

    savePost(post : Post, image : File): Observable<Post> {
          
        let headers = new Headers({});
        let options = new RequestOptions({ headers: headers });
        let formData = new FormData();
        formData.append('image', image, image.name);
        formData.append('post', JSON.stringify(post));

       return this._http.post("http://localhost:3000/savepost", formData, options)
       .map(res => res.json());
   }

   editPostImageNotChanged(post: Post): Observable<Post> {

       let headers = new Headers({ 'Content-Type': 'application/json' });
       let options = new RequestOptions({ headers: headers });

       return this._http.put("http://localhost:3000/editpost", JSON.stringify(post), options)
           .map(res => res.json());
   }

   getPosts() : Observable<Post[]> {

    return this._http.get("http://localhost:3000/posts")
    .map(res => res.json());

   }

   getPost(id: number) : Observable<Post> {
    
        return this._http.get("http://localhost:3000/post/" + id)
        .map(res => res.json());
         
    }

    deletePost(id: number) : Observable<any> {

        return this._http.delete("http://localhost:3000/post/" + id)
            .map(res => res.json());
             
    }
    
}