import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { StateService } from "../state.service";
import { IGoal } from "./goal.interface";

@Component({
  selector: "app-addgoal",
  template: `
    <form
      class="box mb-4"
      style="width:40%; margin: auto "
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
    >
      <div class="field">
        <label class="label">Tittle</label>
        <div class="control">
          <input class="input" type="text" formControlName="title" />
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <input class="input" type="text" formControlName="description" />
        </div>
      </div>

      <div class="field">
        <label class="label">Status:</label>
        <div class="control">
          <input class="input" type="text" formControlName="status" required />
        </div>
      </div>

      <div class="field">
        <label class="label">Deadline:</label>
        <div class="control">
          <input
            class="input"
            type="text"
            formControlName="deadline"
            required
          />
        </div>
      </div>

      <!-- [disabled]="!form.valid" -->
      <button type="button is-primary">Add Goal</button>
    </form>
  `,
  styles: [],
})
export class AddgoalComponent {
  form = this.formBuilder.nonNullable.group({
    title: [""],
    description: [""],
    status: [""],
    deadline: [""],
  });

  state!: IGoal[];
  user!: { user_id: string; email: string };

  constructor(
    private router: Router,
    private services: StateService,
    private formBuilder: FormBuilder
  ) {
    this.services.bSubject.subscribe((resp) => (this.state = resp as IGoal[]));
    console.log("this from updateing statte", this.state);
    this.user = { user_id: "35664", email: "trsdsadsa" };

    // this.user = JSON.parse(localStorage.getItem("USER")!);
  }

  ngOnInit(): void {}

  onSubmit() {
    //to send the data to the backend and

    const results = this.form.value;
    const newObj: any = { ...results, user_id: this.user.user_id };

    //***********************update the bsjuect*********************** */
    const newArr: IGoal[] = [...this.state, newObj];

    this.services.bSubject.next(newArr);
    this.router.navigate(["list"]);
    //update the local storage
  }
}
