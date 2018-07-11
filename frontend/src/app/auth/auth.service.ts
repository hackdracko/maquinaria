import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {throwError} from "rxjs/internal/observable/throwError";
import {APP_CONFIG, AppConfig} from "../app-config.module";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public token: string;
    public url: string;
    private headers: HttpHeaders;

    constructor(private http: HttpClient,
                private router: Router,
                @Inject(APP_CONFIG) private config: AppConfig) {
        // set token if saved in local storage
        this.url = `${this.config.apiEndpoint}`;
        this.headers = new HttpHeaders();
        this.headers.set('Accept', 'application/json');
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('Cache-control', 'no-cache');

    }

    login(params: any): Observable<any> {
        return this.http.post(this.url + 'authorize', params, {headers: this.headers});

        //return this.http.post(this.url + 'authorize', params, {headers: this.headers})
            /*.map(result => {
                // login successful if there's a jwt token in the response
                let token = result && result['token'];
                if (token) {
                    // set token property
                    localStorage.setItem('token', token);
                    //this.cookieService.set( 'token', token );
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });*/
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}
