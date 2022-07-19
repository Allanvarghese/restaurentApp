import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupform!:FormGroup
  constructor(private formBuilder:FormBuilder , private _http:HttpClient ,private router: Router) { }

  ngOnInit(): void {
    this.signupform= this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      password:[''],

    })
  }
  // make method to create User
  signUp(){
    this._http.post<any>("http://jsonplaceholder.typicode.com/signup",this.signupform.value).subscribe(res=>{
      alert("Signup successfully")
      console.log(res);
      this.signupform.reset();
      this.router.navigate(['login'])
    },
    err=>{
      alert("Error in Signup")
    })
  }

}
