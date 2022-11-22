import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { StateService } from "../state.service";
import { IGoal } from "./goal.interface";

@Component({
  selector: "app-updategoal",
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
      <button type="button is-primary">Update</button>
    </form>
  `,
  styles: [],
})
export class UpdategoalComponent {
  form = this.formBuilder.nonNullable.group({
    title: [""],
    description: [""],
    deadline: [""],
  });

  goal!: IGoal;
  state!: IGoal[];

  constructor(
    private router: Router,
    private services: StateService,
    private formBuilder: FormBuilder
  ) {
    this.goal = this.router.getCurrentNavigation()?.extras.state as IGoal;
    console.log("this is from goal commp", this.goal);

    this.form.patchValue({
      title: this.goal.title,
      description: this.goal.description,
      deadline: "",
    });
    this.services.bSubject.subscribe((resp) => (this.state = resp as IGoal[]));

    console.log("this from updateing statte", this.state);
  }

  ngOnInit(): void {}

  onSubmit() {
    //to send the data to the backend and

    const results = this.form.value;

    const newObj: any = {
      ...this.goal,
      title: results.title,
      description: results.description,
      deadline: results.deadline,
    };

    //***********************update the bsjuect*********************** */
    const newArr: IGoal[] = this.state.filter((g) => g._id !== this.goal._id);

    this.services.bSubject.next([...newArr, newObj]);
    this.router.navigate(["list"]);
    //update the local storage
    localStorage.setItem("STATE", JSON.stringify([...newArr, newObj]));
  }
}
