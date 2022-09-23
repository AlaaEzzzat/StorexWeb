import { IMovie } from "./../../Models/imovie";
import { Component, OnInit, OnChanges } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { MovieService } from "./../../services/movie.service";
import { CategoryService } from "./../../services/category.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  categorizedMovies: any[] = [];
  showLoader: boolean = false;
  selectedCatID: number = 0;
  categoryList: any[] = [];
  constructor(
    private router: Router,
    private movieService: MovieService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.showLoader = true;
    this.movieService.getAllMovies().subscribe({
      next: (movies: any) => {
        this.showLoader = false;
        console.log(movies.message);
        this.categorizedMovies = movies.message;
      },
      error: (err: any) => {
        alert("Error occured in Fetching data please reload ");
      },
    });
    this.categoryService.getAllCategory().subscribe((cateory: any) => {
      this.categoryList = cateory.message;
    });
  }

  deleteMovie(id: number) {
    var confirmation = confirm("Are U sure You want to delete Product?");
    if (confirmation) {
      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          console.log("Deleted!");
          this.movieService
            .getMoviesByCatId(this.selectedCatID)
            .subscribe((movies) => {
              this.categorizedMovies = movies.message;
            });
        },
        error: () => {
          alert("Error occured in Delete Function ");
        },
      });
    } else {
      alert("Don't Worry Nothing Deleted");
    }
  }
  openAddMovieToUpdate(id: number) {
    this.router.navigate(["AddMovie", id]);
  }
  track(index: number, movie: IMovie) {
    return movie.id;
  }
}
