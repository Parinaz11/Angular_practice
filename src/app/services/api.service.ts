import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, Product } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { } // The constructor injects the HttpClient service, allowing the ApiService to use it for making HTTP requests

  get<T>(url:string, options:Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  post<T>(url:string, body:Product, options:Options): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  put<T>(url:string, body:Product, options:Options): Observable<T> {
    return this.httpClient.put<T>(url, body, options) as Observable<T>;
  }

  delete<T>(url:string, options:Options): Observable<T> {
    return this.httpClient.delete<T>(url, options) as Observable<T>;
  }
}
