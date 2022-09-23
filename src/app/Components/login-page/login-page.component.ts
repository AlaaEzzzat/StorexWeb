import { UserService } from "./../../services/user.service";
import { Router } from "@angular/router";

import { Component, OnInit, OnChanges } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css", "./../../styles/formStyle.css"],
})
export class LoginPageComponent implements OnInit {
  insertedUser: any = {};
  loginForm: FormGroup;
  show: string = "password";
  eye: string = "fa fa-eye-slash";

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

  toggle() {
    if (this.show == "text") {
      this.show = "password";
      this.eye = "fa fa-eye-slash";
    } else {
      this.show = "text";
      this.eye = "fa fa-eye";
    }
  }
  login() {
    this.insertedUser = this.loginForm.value;
    this.userService.login(this.insertedUser).subscribe({
      next: (res) => {
        console.log(res.authorisation.token);
        console.log(res.token);
        localStorage.setItem("token", res.authorisation.token);
        this.router.navigate(["/Home"]);
      },
      error: (err) => {
        console.log(err);
        alert("Email or password is incorrect");
      },
    });
  }
  ngOnInit(): void {}
  ngOnChanges(): void {}
}
