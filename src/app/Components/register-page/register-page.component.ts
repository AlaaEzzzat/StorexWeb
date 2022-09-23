import { UserService } from "./../../services/user.service";
import { IUser } from "src/app/Models/iuser";

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
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.css", "./../../styles/formStyle.css"],
})
export class RegisterPageComponent implements OnInit {
  insertedUser: IUser = {} as IUser;
  newSellerCode: number = 0;
  registerForm: FormGroup;
  show: string = "password";
  eye: string = "fa fa-eye-slash";
  myUsers: any = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    //get all user

    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", Validators.required],
      password: ["", [Validators.required]],
      rePassword: ["", Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }
  get name() {
    return this.registerForm.get("name");
  }
  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }
  get rePassword() {
    return this.registerForm.get("rePassword");
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
  registration() {
    this.insertedUser = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
    console.log(this.insertedUser);
    this.userService.addUser(this.insertedUser).subscribe({
      next: (res) => {
        console.log(res);
        /*  console.log(res.token);
        localStorage.setItem("token", res.authorisation.token); */
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        console.log(err);
        alert("Error in Registration");
      },
    });
  }
  ngOnInit(): void {}
  ngOnChanges(): void {}
}
