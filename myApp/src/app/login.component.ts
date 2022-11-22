import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  template: `
    <form
      class="box"
      style="margin:5%;width:40%"
      [formGroup]="form"
      (ngSubmit)="onLogin()"
    >
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            type="email"
            placeholder="e.g. alex@example.com"
            formControlName="email"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            placeholder="********"
            formControlName="password"
          />
        </div>
      </div>

      <button class="button is-info">Login</button>
      <button
        (click)="singnUp()"
        class="button is-small is-success"
        style="marginLeft:60%"
      >
        SignUp
      </button>
    </form>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  form = this.formBuilder.nonNullable.group({
    email: [""],
    password: [""],
  });

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onLogin() {
    //to send the data to the backend and
    // const results = this.form.value;

    // this.form.reset();

     localStorage.setItem("USER",JSON.stringify({status:true,data:"later"}))

    this.router.navigate(["list"]);
  }

  singnUp() {
    this.router.navigate(["", "signUp"]);
  }
}
