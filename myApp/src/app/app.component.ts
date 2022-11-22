import { ThisReceiver } from "@angular/compiler";
import { Component, DoCheck } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  template: `
    <div class="box m-4">
      <section class="hero is-grey-lighter" class="p-5 text-center bg-image">
        <div class="hero-body">
          <div class="level-right" *ngIf="!val; else logoutButton"></div>
          <div class="tabs is-large">
            <ul>
              <li class=""><a [routerLink]="['', 'login']"></a></li>
            </ul>
          </div>

          <router-outlet></router-outlet>
        </div>

        <ng-template #logoutButton>
          <button class="button is-info " (click)="logOut()">LogOut</button>
        </ng-template>
      </section>
      <!--*************************** Footers******************************* -->
      <footer class="footer"  *ngIf="val" >
        <div class="content has-text-centered">
          <p>
            <strong>Content</strong> by
            <a href="https://jgthms.com">T.Ronnie & Paval</a>. The source code
            is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIU</a>.
            The website content is licensed
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
              >CC BY @Asaad</a
            >.
          </p>
        </div>
      </footer>
    </div>
  `,
  styles: [``],
})
export class AppComponent implements DoCheck {
  val!: boolean 
  title = "myApp";
user!:{status:boolean,data:string}
  constructor(private router: Router) {

  }
  ngDoCheck(): void {
    const local = localStorage.getItem("USER")!;
    if (local) {
       this.user =JSON.parse(local)
      this.val =this.user.status
    }
  }

  logOut() {
    this.router.navigate(["", "login"]);
    // clear out the local satorahe and go back to the login
    console.log("Am working");
   localStorage.clear()
  }
}
