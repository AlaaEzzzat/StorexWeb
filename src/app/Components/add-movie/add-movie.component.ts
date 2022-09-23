import { MovieService } from "./../../services/movie.service";

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CategoryService } from "./../../services/category.service";
@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.css", "./../../styles/formStyle.css"],
})
export class AddMovieComponent implements OnInit {
  originMovie: any = {};
  movie: any = {};
  currMovieID: number = 0;
  showLoader: boolean = false;
  method: string = "";

  status: boolean = false;
  categoryList: any[] = [];
  addMovieForm: FormGroup;
  constructor(
    private movieService: MovieService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.addMovieForm = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", Validators.required],
      image: ["", [Validators.required]],
      category_id: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((cateory: any) => {
      this.categoryList = cateory.message;
    });
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.currMovieID = paramMap.get("mid") ? Number(paramMap.get("mid")) : 0;
      this.status = true;
      if (this.currMovieID == 0) {
        console.log("in add Method");
        this.method = "ADD";
      } else {
        console.log("in update Method");
        this.showLoader = true;
        this.method = "Update";
        console.log(this.currMovieID);
        this.movieService
          .getMovieById(this.currMovieID)
          .subscribe((currMovie) => {
            this.showLoader = false;
            this.originMovie = currMovie.message;
            console.log(this.originMovie.image);
            this.addMovieForm.patchValue(currMovie.message);
          });
      }
    });
  }

  get f() {
    return this.addMovieForm.controls;
  }
  get name() {
    return this.addMovieForm.get("name");
  }
  get description() {
    return this.addMovieForm.get("description");
  }

  get image() {
    return this.addMovieForm.get("image");
  }
  get category() {
    return this.addMovieForm.get("category_id");
  }

  onImageUpload(event: any) {
    if (event.target.files.length > 0) {
      const myImage = event.target.files[0];
      this.addMovieForm.get("image")?.setValue(myImage);
    }
  }
  doAction() {
    this.movie = this.addMovieForm.value;
    console.log(this.movie);

    let formData = new FormData();
    formData.append("name", this.movie.name);
    formData.append("description", this.movie.description);
    formData.append("category_id", String(this.movie.category_id));
    formData.append("image", this.movie.image);
    console.log(formData);

    if (this.currMovieID == 0) {
      console.log("in add");
      this.movieService.addMovie(formData).subscribe({
        next: (response: any) => {
          console.log(" Added!");
          console.log(response.status);
          if (response.status == "failed") {
            alert("make Sure of your type of Image ");
          } else {
            this.router.navigate(["/Home/"]);
          }
        },
        error: (err: any) => {
          console.log(err);
          alert("Error occured in insert Function ");
        },
      });
    } else {
      console.log("in update");
      formData.append("_method", "put");
      console.log(formData);
      this.movieService.updateMovie(formData, this.currMovieID).subscribe({
        next: (response: any) => {
          console.log(" Updated!");
          console.log(response);
          this.router.navigate(["/Home/"]);
        },
        error: (err: any) => {
          console.log(err);
          alert("Error occured in update Function ");
        },
      });
    }
  }
}
