import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform!: FormGroup;
  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  login() {
    this._http.get<any>("http://jsonplaceholder.typicode.com/signup").subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginform.value.email && a.password === this.loginform.value.password
      })
      if (user) {
        alert("login successfully");
        this.loginform.reset();
        this.router.navigate(['restaurent']);
      }
      else {
        alert("user not found!!!!")
      }
    },
      err => {
        alert("server error")
      }
    )

  }

}
