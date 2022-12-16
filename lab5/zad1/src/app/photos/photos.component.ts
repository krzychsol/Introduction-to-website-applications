import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit{
  constructor(private photoService: PostsService){}

  photos: any[] = []

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe(res => this.photos = res)
  }
}
