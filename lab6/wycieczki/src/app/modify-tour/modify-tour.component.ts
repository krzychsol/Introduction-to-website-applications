import { ActivatedRoute, Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { NgModule, Component, Pipe, OnInit, EventEmitter, Output } from "@angular/core";
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Tour } from "../tour/tour.component";
import { CommonModule } from '@angular/common';
import { AddingService } from "../adding.service";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DbService } from "../db.service";

@Component({
  selector: 'app-modify-tour',
  templateUrl: './modify-tour.component.html',
  styleUrls: ['./modify-tour.component.css']
})
export class ModifyTourComponent implements OnInit {

  id: any = null;
  tour: any = null;
  subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private db: DbService,
    private router: Router
  ) {
    this.createForm();
  }
  
  dateSent = new Date;
  dateSent2 = new Date;

  newTour: Tour = {
      key: "",
      id: 1,
      name: '',
      destination: '',
      dateBegin: '',
      dateEnd: "",
      imageURL: "assets/img/tour_pic.jpg",
      places: 0,
      money: 0,
      description: "",
      display: true,
      rate: 0
  };

  tourModifyForm: FormGroup = Object();
  name: FormControl = new FormControl("",  Validators.required);
  destination: FormControl = new FormControl("",  Validators.required);
  dateBegin: FormControl = new FormControl("",  [Validators.required, dateBeginValidator]);
  dateEnd: FormControl = new FormControl("",  [Validators.required, dateEndValidator]);
  price: FormControl = new FormControl("",  [Validators.required, Validators.min(0)]);
  places: FormControl = new FormControl("",  [Validators.required, Validators.min(0)]);
  description: FormControl = new FormControl("",  Validators.required);
  imageUrl: FormControl = new FormControl("");


  createForm() {
    this.tourModifyForm = new FormGroup({
      name: this.name,
      destination: this.destination,
      dateBegin: this.dateBegin,
      dateEnd: this.dateEnd,
      price: this.price,
      places: this.places,
      description: this.description,
      imageUrl: this.imageUrl,
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.subscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.db
    .getToursList()
    .pipe(first())
    .subscribe((tours: any[]) => {
      for (let t of tours) {
        if (t.id == this.id) {
          this.tourModifyForm.patchValue(t)
          break;
        }
      }})
  }

  dateBeginChange(e: any) {
    this.dateSent2 = e.target.value;
  }

  
  submitForm() {
    if (this.tourModifyForm.valid) {
          console.log('klik');
        this.db
          .getToursList()
          .pipe(first())
          .subscribe((tours: any[]) => {
            let tour: any;
            for (let t of tours) {
              if (t.id == this.id) {
                tour = t;
                break;
              }
            }
            let dataToUpdate = {
              name: this.tourModifyForm.get('name')!.value,
              destination: this.tourModifyForm.get('destination')!.value,
              dateBegin: this.tourModifyForm.get('dateBegin')!.value,
              dateEnd: this.tourModifyForm.get('dateEnd')!.value,
              price: this.tourModifyForm.get('price')!.value,
              places: this.tourModifyForm.get('places')!.value,
              description: this.tourModifyForm.get('ShortDesc')!.value,
              imageUrl: this.tourModifyForm.get('imageUrl')!.value,
            };
            try{
              this.db.updateTour(dataToUpdate, this.id)
            }catch(err){
              window.alert(err)
            }
            this.tourModifyForm.reset();
          });
        this.router.navigate(['/managerpanel/'])
      }
    }
  }

interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null
}

export function dateBeginValidator(control: FormControl) { 

  let date = (new Date).toISOString().substring(0, 10);

  if(control.value < date) return { invalidDateBegin: true };

  return null; 
}

export function dateEndValidator(d: FormGroup): ValidatorFn { 

  return (control: AbstractControl): ValidationErrors | null => {
    
    console.log(d.value.da, control.value);
    if(control.value < d) return { 'invalidDateEnd': true };
    return null; 
    
  }

  /*
  constructor(
    private route: ActivatedRoute,
    private db: DbService,
    private router: Router
  ) { }

  dateSent = new Date;
  dateSent2 = new Date;
  id: any = null;
  tour: any = null;
  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.db
    .getToursList()
    .pipe(first())
    .subscribe((tours: any[]) => {
      for (let t of tours) {
        if (t.id == this.id) {
          this.tourModifyForm.patchValue(t)
          break;
        }
      }})
  }

  dateBeginChange(e: any) {
    this.dateSent2 = e.target.value;
  }

  dateBeginValidator(control: FormControl) { 

    let date = (new Date).toISOString().substring(0, 10);
  
    if(control.value < date) return { invalidDateBegin: true };
  
    return null; 
  }

  dateEndValidator(d: FormGroup): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      
      console.log(d.value.da, control.value);
      if (control.value < d) return { 'invalidDateEnd': true };
      return null;
      
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  tourModifyForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    destination: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    dateBegin: new FormControl('', [
      Validators.required
    ]),
    dateEnd: new FormControl('', [
      Validators.required
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[0-9]*.?[0-9]+'),
    ]),
    places: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.pattern('[0-9]*.?[0-9]+'),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    imageUrl: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  showError = false;
  showOk = false;

  getFormValidationErrors(form: any) {
    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  submitForm() {
    console.log('klik');
    if (!this.tourModifyForm.valid) {
      this.showError = true;
      return;
    }
    this.db
      .getToursList()
      .pipe(first())
      .subscribe((tours: any[]) => {
        let tour: any;
        for (let t of tours) {
          if (t.id == this.id) {
            tour = t;
            break;
          }
        }
        let dataToUpdate = {
          name: this.tourModifyForm.get('name')!.value,
          destination: this.tourModifyForm.get('destination')!.value,
          dateBegin: this.tourModifyForm.get('dateBegin')!.value,
          dateEnd: this.tourModifyForm.get('dateEnd')!.value,
          price: this.tourModifyForm.get('price')!.value,
          places: this.tourModifyForm.get('places')!.value,
          description: this.tourModifyForm.get('ShortDesc')!.value,
          imageUrl: this.tourModifyForm.get('imageUrl')!.value,
        };
        try{
          this.db.updateTour(dataToUpdate, this.id)
        }catch(err){
          window.alert(err)
        }
        this.showError = false;
        this.showOk = true;
        this.tourModifyForm.reset();
      });
    this.router.navigate(['/managerpanel/'])
  }
  */
}
