import {App, Platform} from 'ionic-angular';
import {Http} from '@angular/http';
import {Headers} from '@angular/http';

declare var window: any;

export class Authentication {

    http: Http;

    constructor(private platform: Platform, http: Http) {
        this.http = http;
    }

    logout(): void {
        window.localStorage.removeItem("github_access_token");
    }

    login(): void {
        this.platform.ready().then(() => {
            this.githubLogin("f85b3f5709b37fd31087", "cb9adbcca15fcf41c0cf2a6c6ff1a53ed5b8e542", ["user", "repo", "notifications"], {}).then((access_token) => {
                var data = JSON.parse(access_token._body);
                var token = data.access_token
                window.localStorage.setItem("github_access_token", token);
            }, (error) => {
                console.error(error);
            });
        });
    }

    githubLogin(clientId, clientSecret, appScope, options): Promise<any> {
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

}
