import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isUserLogged: boolean = false;
  userEmail: string = "";
  constructor(private authService: UserService, private route: Router) {
    this.isUserLogged = this.authService.isUserLogged;
  }

  ngOnInit(): void {
    this.authService.loggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });
  }
  logout() {
    var confirmtion = confirm("Sure! You want to leave US!");
    if (confirmtion) {
      this.authService.logout();
      this.isUserLogged = this.authService.isUserLogged;
      this.route.navigate(["/login"]);
    }
  }
}
