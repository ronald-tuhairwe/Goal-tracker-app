import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { StateService } from "../state.service";
import { IGoal, IStep } from "./goal.interface";

@Component({
  selector: "app-steps",
  template: `
    <div class="box is-primary">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>TITLE</th>
            <th>STATUS</th>
            <th>DEADLINE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody *ngFor="let s of goal.steps">
          <tr>
            <td>{{ s.title }}</td>
            <td>{{ s.status }}</td>
            <td>{{ s.deadline }}</td>
            <td>
              <a (click)="delete(s)">
                <span class="icon is-small m-2 is-danger"
                  ><i class="fa-solid fa-trash-can" (click)="delete(s)"></i
                ></span>
              </a>

              <a (click)="update(s)">
                <span class="icon is-small m-2"
                  ><i class="fa-solid fa-file-pen"></i
                ></span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="button is-info m-1" (click)="addStep()">Add Step</button>
      <button class="button is-info m-1" (click)="goGoal()"> <i class="fa-solid fa-circle-arrow-left m-1"></i>Go Back </button>
    </div>
  `,
  styles: [],
})
export class StepsComponent {
  step!: IStep;

  state!: IGoal[];
  stateObj!: { step: IStep; goal: IGoal };
  goal!: IGoal;

  constructor(private router: Router, private service: StateService) {
    this.stateObj = this.router.getCurrentNavigation()?.extras.state as any;
    this.service.bSubject.subscribe((resp) => (this.state = resp as IGoal[]));
    this.step = this.stateObj.step;
    this.goal = this.stateObj.goal;
  }

  update(s: IStep) {
    this.router.navigate(["list", "updateStep"], {
      state: { step: s, goal: this.goal },
    });
  }

  addStep() {
    this.router.navigate(["list", "addStep"], { state: this.goal });
  }


  goGoal(){
    this.router.navigate(['list'])
  }


  delete(st: IStep) {
    const newStepArr: any[] = this.goal.steps.filter(
      (s) => s.title !== st.title
    );
    const newGoal: IGoal = { ...this.goal, steps: newStepArr };
    const newStateArr: IGoal[] = this.state.filter(
      (g) => g._id !== this.goal._id
    );
    this.goal.steps = newStepArr;
    console.log("from delete", newStateArr);
    this.service.bSubject.next([...newStateArr, newGoal]);
  }
}
