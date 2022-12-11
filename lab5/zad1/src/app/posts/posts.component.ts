import { Component,OnInit } from '@angular/core';
import { FormsModule,ReactiveFormsModule,FormControl,FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  
  constructor(private postsService: PostsService){}
  posts: any[] = []
  
  newPostForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl(''),
    name: new FormControl('')
  })

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(res => this.posts=res)
  }

  sendData() {
    let data = {
      "userId": 0,
      "id": 0,
      "title": this.newPostForm.get('title')!.value,
      "body": this.newPostForm.get('text')!.value
    }
    this.postsService.sendPost(JSON.stringify(data)).subscribe(res => this.posts.splice(0,0,data))
  }

}
