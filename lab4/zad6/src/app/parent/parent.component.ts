import { Component,OnInit, ViewChild } from '@angular/core';
import { TopicsComponent } from '../topics/topics.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit{
  constructor() { }
  @ViewChild(TopicsComponent)
  childComponent!: TopicsComponent;

  ngOnInit(): void{
  }

  public courseArgs = {
    selectedCourse: "",
    selectedTitle: ""
  }
  
  getClickedButton(data: { selectedCourse: string; selectedTitle: string; }) {
    this.courseArgs = data;
  }

}
