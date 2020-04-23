import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

function userNameValidator(control: FormControl):{ [s: string]: boolean} {
  if (!control.value.match(/^a/)) {
    return {invalidUser: true };
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myForm: FormGroup;

  userName: AbstractControl;

  password: AbstractControl;

  name$: Observable<string>;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group(
      {
        'userName': ['aaa',Validators.compose([Validators.required, userNameValidator])],
        'password': ['',Validators.compose([Validators.required, Validators.minLength(5)])]
      }
    );

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
  }
  onSubmit(value: any) {
    console.log(value);
  }
}
