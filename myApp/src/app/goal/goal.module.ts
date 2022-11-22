import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListgoalsComponent } from "./listgoals.component";
import { UpdategoalComponent } from "./updategoal.component";
import { AddgoalComponent } from "./addgoal.component";

import { StepsComponent } from "./steps.component";
import { AddstepComponent } from "./addstep.component";
import { UpdatestepComponent } from "./updatestep.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ListgoalsComponent,
    UpdategoalComponent,
    AddgoalComponent,
    
    StepsComponent,
    AddstepComponent,
    UpdatestepComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "", redirectTo: "list", pathMatch: "full" },
      { path: "list", component: ListgoalsComponent },
      { path: "updateGoal", component: UpdategoalComponent },
      { path: "addGoal", component: AddgoalComponent },
      
      { path: "step", component: StepsComponent },
      { path: "addStep", component: AddstepComponent },
      { path: "updateStep", component: UpdatestepComponent },
    ]),
  ],
})
export class GoalModule {}
