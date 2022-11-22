import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  template: `
    <form
      class="box "
      style="margin:5%;width:40%"
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
    >
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" formControlName="email" />
        </div>
      </div>

      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" type="text" formControlName="first_name" />
        </div>
      </div>

      <div class="field">
        <label class="label">Last Name:</label>
        <div class="control">
          <input class="input" type="text" formControlName="last_name" />
        </div>
      </div>

      <div class="field">
        <label class="label">Password:</label>
        <div class="control">
          <input class="input" type="password" formControlName="password" />
        </div>
      </div>

      <button class="button is-success">Sing Up</button>
    </form>
  `,
  styles: [],
})
export class SignupComponent implements OnInit {
  form = this.formBuilder.nonNullable.group({
    email: [""],
    first_name: [""],
    last_name: [""],
    password: [""],
  });

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    //to send the data to the backend and
    const results = this.form.value;
    console.log(results);

    this.router.navigate(["", "login"]);
  }
}
