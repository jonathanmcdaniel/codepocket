/**
 * @module api
 * 
 * @description
 * Interface for working with the github api
 */
import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {App, Platform} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

declare var window: any;

@Injectable()
export class api {

    static get parameters() {
        return [[Http]];
    }
    constructor(private http: Http){

    }

    setLocalToken(token: string) {
        window.localStorage.setItem("github_access_token", token);
    }

    getLocalToken(): string {
        return window.localStorage.getItem("github_access_token") || "";
    }

    authenticate(clientId, clientSecret, appScope, options): Promise<any> {
        var redirect_uri = "http://localhost/callback";
        var http: Http;
        var promise = new Promise<Object>((resolve, reject) => {
            if (window.cordova) {
                var browserRef = window.cordova.InAppBrowser.open('https://github.com/login/oauth/authorize?client_id=' + clientId + '&redirect_uri=' + redirect_uri + '&scope=' + appScope.join(","), '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                browserRef.addEventListener('loadstart', function(event) {
                    if ((event.url).indexOf(redirect_uri) === 0) {
                        var requestToken = (event.url).split("code=")[1];
                        var body = "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=" + redirect_uri + "&code=" + requestToken;
                        var headers = new Headers();
                        headers.append('Content-Type', 'application/x-www-form-urlencoded');
                        headers.append('Accept', 'application/json');
                        http.post("https://github.com/login/oauth/access_token", body, { headers: headers })
                            .toPromise()
                            .then((response) => {
                                setTimeout(function() {
                                    resolve(response);
                                    browserRef.close();
                                }, 10);
                            }).catch((error) => {
                                console.error(error);
                                reject(error);
                            });
                    }
                });
                browserRef.addEventListener('exit', function(event) {
                    reject("The sign in flow was canceled");
                });
            } else {
                reject("Could not find InAppBrowser plugin");
            }
        });
        return promise;
    }

    logout() {
        window.localStorage.removeItem("github_access_token");
    }

    login() {
        this.authenticate("f85b3f5709b37fd31087", "cb9adbcca15fcf41c0cf2a6c6ff1a53ed5b8e542", ["user", "repo", "notifications"], {}).then((access_token) => {
                var data = JSON.parse(access_token._body);
                var token = data.access_token
                this.setLocalToken(token);
            }, (error) => {
                console.error(error);
            });
    }

    getHeaders(): Headers {
        var headers = new Headers();
        var token = "token " + this.getLocalToken();
        headers.append('Authorization', token);
        return headers;
    }

    get(url: string): Observable<any> {
        /*
        if (this.getLocalToken() === "") {
            this.login();
        }*/
        var headers = this.getHeaders();
        var response = this.http.get(url).map(res => res.json());
        // var response = this.http.get(url, { headers: headers }).map(res => res.json());
        return response;
    }

    post(url: string, json: string) {
        var headers = this.getHeaders();
    }

    patch(url: string, json: string) {
        var headers = this.getHeaders();
    }

    put(url: string, json: string) {
        var headers = this.getHeaders();
    }

    delete(url: string) {
        var headers = this.getHeaders();
    }
}