import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { StateService } from "../state.service";
import { IGoal, IStep } from "./goal.interface";

@Component({
  selector: "app-updatestep",
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
            type="date"
            formControlName="deadline"
            required
          />
        </div>
      </div>

      <button type="button is-primary" [disabled]="!form.valid">Update</button>
    </form>
  `,
  styles: [],
})
export class UpdatestepComponent {
  form = this.formBuilder.nonNullable.group({
    title: [""],
    description: [""],
    status: [""],
    deadline: [""],
  });

  step!: IStep;
  goal!: IGoal;
  state!: IGoal[];

  stateObj!: { step: IStep; goal: IGoal };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private services: StateService
  ) {
    this.stateObj = this.router.getCurrentNavigation()?.extras.state as any;
    this.step = this.stateObj.step as IStep;
    this.goal = this.stateObj.goal as IGoal;

    console.log("this is from update steps*****", this.stateObj);

    this.services.bSubject.subscribe((resp) => (this.state = resp as IGoal[]));

    this.form.patchValue({
      title: this.step.title,
      description: this.step.description,
      status: this.step.status,
      deadline: String(this.step.deadline),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    //to send the data to the backend and
    const results = this.form.value;

    /********************Updating the bsuject************************************************ */
    const newStepArr: any[] = this.goal.steps.filter(
      (s) => s.title !== this.step.title
    );
    const editedStedArr = [...newStepArr, results] as IStep[];
    const editedGoal: IGoal = { ...this.goal, steps: editedStedArr };
    const newState: IGoal[] = this.state.filter((g) => g._id !== this.goal._id);

    this.router.navigate(["list", "step"], {
      state: { step: editedStedArr, goal: editedGoal },
    });

    //***********************update the bsjuect*********************** */
    this.services.bSubject.next([...newState, editedGoal]);
  }
}
