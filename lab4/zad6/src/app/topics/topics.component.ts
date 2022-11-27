import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-angular-course',
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

    basicsTitle: string = "The Basics";
    basicsDesc: string = "Core Angular basics you have to know";
    componentsTitle: string = "Components";
    componentsDesc: string = "Components are a core concept for building Angular UIs and apps";
    eventsTitle: string = "Events";
    eventsDesc: string = "Events are important in Angular";

    constructor() { }
    
    ngOnInit(): void {
    }

    @Output() 

    btnBasicsClicked() {
        
    }

    btnComponentsClicked() {
        
    }

    btnEventsClicked() {
        
    }

}