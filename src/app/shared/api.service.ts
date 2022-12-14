import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint: string = 'http://127.0.0.1:5000/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  // Add employee
  AddEmployee(data: Employee): Observable<any> {
    let API_URL = `${this.endpoint}new_employee`;
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }
  // Get all employees
  GetEmployeess() {
    return this.http.get(`${this.endpoint}employee`);
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
