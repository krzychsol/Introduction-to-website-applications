import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';


@Component({
    selector: 'app-angular-course',
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

    selectedCourse = "";
    selectedTitle = "";

    constructor() { }
    
    ngOnInit(): void {
    }
    
    @Output() onClick = new EventEmitter<{selectedCourse: string; selectedTitle: string;}>(); 

    btnClicked(title: string,course: string) {
        this.selectedCourse = course;
        this.selectedTitle = title;
        this.onClick.emit({selectedCourse: this.selectedCourse,selectedTitle: this.selectedTitle});
    }
}