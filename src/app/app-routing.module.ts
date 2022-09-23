import { AuthGuard } from "./Gaurds/auth.guard";
import { AddMovieComponent } from "./Components/add-movie/add-movie.component";
import { NotFoundComponent } from "./Components/not-found/not-found.component";
import { RegisterPageComponent } from "./Components/register-page/register-page.component";
import { LoginPageComponent } from "./Components/login-page/login-page.component";
import { HomeComponent } from "./Components/home/home.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "Home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },
  {
    path: "AddMovie",
    component: AddMovieComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "AddMovie/:mid",
    component: AddMovieComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
