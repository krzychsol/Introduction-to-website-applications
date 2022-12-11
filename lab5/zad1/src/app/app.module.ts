import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostsComponent } from './posts/posts.component';
import { PhotosComponent } from './photos/photos.component';
import { SinglephotoComponent } from './singlephoto/singlephoto.component';
import { HomeComponent } from './home/home.component';
import { from } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostsComponent,
    PhotosComponent,
    SinglephotoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormControl,
    FormGroup
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
