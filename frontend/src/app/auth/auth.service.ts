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
    private httpOptionsAuth: {};
    private httpOptions: {};

    constructor(private http: HttpClient,
                private router: Router,
                @Inject(APP_CONFIG) private config: AppConfig) {
        // set token if saved in local storage
        this.url = `${this.config.apiEndpoint}`;
        /*this.headers = new HttpHeaders();
        this.headers.set('Accept', 'application/json');
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('Cache-control', 'no-cache');
        this.token = localStorage.getItem('token');
        if(this.token != ''){
            this.headers.set('Authorization', 'Bearer ' + this.token);
            console.log("TOKEN " + this.token);
        }*/
    }

    login(params: any): Observable<any> {
        this.httpOptionsAuth = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type':  'application/json',
                'Cache-control': 'no-cache',
            })
        };
        return this.http.post(this.url + 'authorize', params, this.httpOptionsAuth);
    }

    logout(){
        sessionStorage.clear();
        this.router.navigate(['/']);
    }

    get(url: string, params: string): Observable<any> {
        this.headerBearer();
        return this.http.get(this.url + url + params, this.httpOptions);
    }

    post(url: string, params?: {}): Observable<any> {
        this.headerBearer();
        return this.http.post(this.url + url, params, this.httpOptions);
    }

    put(url: string, params?: {}): Observable<any> {
        this.headerBearer();
        return this.http.put(this.url + url, params, this.httpOptions);
    }

    delete(url: string): Observable<any> {
        this.headerBearer();
        return this.http.delete(this.url + url, this.httpOptions);
    }

    public headerBearer(){
        this.token = sessionStorage.getItem('token');
        this.httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type':  'application/json',
                'Cache-control': 'no-cache',
                'Authorization': 'Bearer ' + this.token,
            })
        };
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
