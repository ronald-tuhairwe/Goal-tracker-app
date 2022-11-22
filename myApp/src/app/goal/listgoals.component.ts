import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { StateService } from "../state.service";
import { IGoal, IStep } from "./goal.interface";

@Component({
  selector: "app-listgoals",
  template: `
    <div class="panel is-success" style="width:60%; margin: auto ">
      <p class="panel-heading">
        List of Goals
      </p>
      <p class="panel-tabs"></p>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input is-success" type="text" placeholder="Search" />
          <span class="icon is-left">
            <i class="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <div
        *ngFor="let g of state"
        class="panel-block"
        style="width:90%; margin: auto"
      >
        <div class="box" style="width: 80%; margin: auto">
          <label class="goalTitle"><i class="fa-solid fa-circle-dot"></i> <strong style="margin-left:2%;color:DarkCyan;">{{ g.title }}</strong></label>
          <!-- <h2>Tittle : {{ g.title }}</h2> -->
          <div class="m-4">
          <strong>
              <p style="">Description : {{ g.description }}</p>
              <div style="padding:10px;">
                Status:<div style="display:flex; padding:10px"><progress
                  class="progress is-success"
                  value={{getStatusBarValue(g)}}
                  max="100"
                  style="width:50%"
                ></progress>
                <p>{{getStatusBarValue(g)}}%</p></div>
              </div>
              <p style="margin-left:20%">Deadline: {{ g.deadline }}</p>
            </strong>
          </div>

          <div class="tabs is-toggle is-toggle-rounded">
            <ul>
              <li (click)="goSteps(g)" class="is-active">
                <a>
                  <span class="icon is-small"
                    ><i class="fa-sharp fa-solid fa-stairs"></i
                  ></span>
                  <span>View Steps</span>
                </a>
              </li>

              <li (click)="update(g)">
                <a>
                  <span class="icon is-small"
                    ><i class="fa-solid fa-file-pen"></i
                  ></span>
                  <span>Edit</span>
                </a>
              </li>

              <li (click)="delete(g)">
                <a>
                  <span class="icon is-small"
                    ><i class="fa-solid fa-trash-can"></i
                  ></span>
                  <span>Delete</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div style=" marginLeft:10%">
        <button
          class="button is-success m-2"
          (click)="addGoal()"
          style="width: 80%;   align-items: center"
        >
          <span class="icon is-small"
            ><i style="color: blue" class="fa-solid fa-file-circle-plus"></i
          ></span>
          <span style="color: aliceblue">Add New Goal</span>
        </button>
      </div>
    </div>
    
  `,
  styles: [`
  .goalTitle{font-family: cursive; font-size: 24px; font-style: normal; font-variant: normal; font-weight: 700; line-height: 26.4px;}`],
})
export class ListgoalsComponent {
  statusBarValue: number = 10
  state!: IGoal[];
  user!: { user_id: string; email: string };
  steps!: IStep;

  constructor(private router: Router, private service: StateService) {
    this.service.bSubject.subscribe((resp) => (this.state = resp as IGoal[]));

    // *************************saving the sate in the local state**********************/
    localStorage.setItem("STATE", JSON.stringify(this.state));
    localStorage.setItem(
      "USER",
      JSON.stringify({ status: true, data: "later" })
    );
  }

  update(g: IGoal) {
    this.router.navigate(["list", "updateGoal"], { state: g });
  }

  addGoal() {
    this.router.navigate(["list", "addGoal"]);
  }

  goGoal(g: IGoal) {
    this.router.navigate(["list", "goal"], { state: g });
  }

  getStatusBarValue(g:IGoal){
console.log("this is my G", g.steps)
 let noOfCompletedSteps=0;
 for (let elem of g.steps){
  if(elem.status==="completed")
      {
        noOfCompletedSteps++
      }
 }
 const result : number=+(noOfCompletedSteps/g.steps.length).toFixed(2)
 return  result*100 }

  goSteps(g: IGoal) {
    this.router.navigate(["list", "step"], {
      state: { step: g.steps, goal: g },
    });
  }

  delete(g: IGoal) {
    const newStateArr: IGoal[] = this.state.filter((gl) => gl._id !== g._id);

    console.log("from delete", newStateArr);
    this.service.bSubject.next(newStateArr);
  }
}
