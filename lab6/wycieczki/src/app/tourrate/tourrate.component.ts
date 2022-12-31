import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tourrate',
  templateUrl: './tourrate.component.html',
  styleUrls: ['./tourrate.component.css']
})
export class TourrateComponent {
    constructor(public auth: AuthService) {}

    @Output() newReviewEvent = new EventEmitter<review>();

    reviews: review[] = [];
    errorArray: any[] = [];

    addReview = new FormGroup({
      nickname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      date: new FormControl('', [Validators.required]),
      review: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300),
      ]),
    });

    submitForm() {
      let newReview = {
        nick: this.addReview.get('nickname')!.value,
        date: this.addReview.get('date')!.value,
        review: this.addReview.get('review')!.value,
      } as review;
      this.newReviewEvent.emit(newReview);
      this.addReview.reset();
    }

    ngOnInit(): void {}
}

  interface review {
    nick: string;
    date: string;
    review: string;
  }
