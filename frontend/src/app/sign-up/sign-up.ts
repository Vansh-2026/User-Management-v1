import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit {
  signUpForm: FormGroup | any = null;
  genders = ["Male", "Female"];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      Name: new FormControl(null, [Validators.required]),
      Email: new FormControl(null, [Validators.email, Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null),
      Mobile: new FormControl(null),
      

    });
    
  }
  
 onSubmitClick(){
     this.signUpForm["submitted"] = true;
    console.log(this.signUpForm.value);
  }

}
