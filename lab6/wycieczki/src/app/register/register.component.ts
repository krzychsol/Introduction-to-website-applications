import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService) { }
  showError = false;
  showOk = false;

  ngOnInit(): void {
  }

  regForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  
  getErrorMessage() {
    if (this.regForm.get('email')?.hasError('required')) {
      return 'Wprowadź dane!';
    }
    if (this.regForm.get('password')?.hasError('required')) {
      return 'Wprowadź dane!';
    }
  
    return this.regForm.get('email')?.hasError('email') ? 'Niepoprawny adres e-mail!' : '';
  }


  submitForm() {
    console.log(this.regForm.valid);
    if (!this.regForm.valid) {
      this.showError = true;
      return;
    }
    let email = this.regForm.get('email')!.value;
    let pass = this.regForm.get('password')!.value;
    this.showError = false;
    this.auth.registerEmailPass(email!, pass!);
    this.regForm.reset();
    this.showOk = true;
  }

}

