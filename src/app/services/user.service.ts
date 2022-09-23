import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl: string = "https://test-api.storexweb.com/api";
  users: any[] = [];
  user: any = {};
  isLoggedSubject: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient) {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isUserLogged);
  }

  login(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/login`, user);
  }

  addUser(movie: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/register`, movie);
  }

  logout() {
    localStorage.removeItem("token");
    this.isLoggedSubject.next(false);
  }

  get isUserLogged(): boolean {
    return localStorage.getItem("token") ? true : false;
  }

  loggedStatus(): Observable<boolean> {
    return this.isLoggedSubject;
  }
}
