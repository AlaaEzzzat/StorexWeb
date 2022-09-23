import { IMovie } from "./../Models/imovie";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  baseUrl: string = "https://test-api.storexweb.com/api/movies";

  httpOptions: {};
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "multipart/form-data",
      }),
    };
  }
  addMovie(movie: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}`, movie);
  }
  getAllMovies(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}`);
  }
  getMovieById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`);
  }
  getMoviesByCatId(catId: number): Observable<any> {
    if (catId == 0) {
      return this.getAllMovies();
    } else {
      return this.httpClient.get<any>(`${this.baseUrl}?category_id=${catId}`);
    }
  }

  updateMovie(movie: any, id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "multipart/form-data");
    return this.httpClient.put<any>(
      `${this.baseUrl}/${id}`,
      movie,

      this.httpOptions
    );
  }

  deleteMovie(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}
