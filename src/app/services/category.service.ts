import { IMovie } from "./../Models/imovie";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  baseUrl: string = "https://test-api.storexweb.com/api/category";
  constructor(private httpClient: HttpClient) {}
  getAllCategory(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}`);
  }
  getCategoryById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`);
  }

  deleteMovie(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}
