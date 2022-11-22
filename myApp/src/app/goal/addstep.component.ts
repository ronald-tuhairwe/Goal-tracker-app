import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { StateService } from "../state.service";
import { IGoal, IStep } from "./goal.interface";

@Component({
  selector: "app-addstep",
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
      <button type="button is-primary" [disabled]="!form.valid">
        Add Step
      </button>
    </form>
  `,
  styles: [],
})
export class AddstepComponent {
  form = this.formBuilder.nonNullable.group({
    title: [""],
    description: [""],
    status: [""],
    deadline: [""],
  });

  state!: IGoal[];
  goal!: IGoal;

  constructor(
    private router: Router,
    private services: StateService,
    private formBuilder: FormBuilder
  ) {
    this.goal = this.router.getCurrentNavigation()?.extras.state as any;
    this.services.bSubject.subscribe((resp) => (this.state = resp as IGoal[]));

    console.log(this.goal, "from adding steps");
  }

  ngOnInit(): void {}

  onSubmit() {
    //to send the data to the backend and

    const newStepArr: any = [...this.goal.steps, this.form.value];
    const newGoal: IGoal = { ...this.goal, steps: newStepArr };

    //***********************update the bsjuect*********************** */
    const newArr: IGoal[] = this.state.filter((g) => g._id !== this.goal._id);

    const newState: IGoal[] = [...newArr, newGoal];

    this.services.bSubject.next(newState);
    this.router.navigate(["list", "step"], {
      state: { step: newStepArr, goal: newGoal },
    });

    localStorage.setItem("STATE", JSON.stringify(newState));
  }
}
