import {ViewChild} from '@angular/core';
import {Component} from '@angular/core';
import {ionicBootstrap, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ProfilePage} from './pages/profile/profile';
import {RepoListPage} from './pages/repo-list/repo-list';
import {Authentication} from './services/authentication';
import {Http} from '@angular/http';
import {Headers} from '@angular/http';
import {enableProdMode} from "@angular/core";

enableProdMode();

declare var window: any;

@Component({
    templateUrl: 'build/app.html'
})

ionicBootstrap(MyApp, [], {});

class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = ProfilePage;
    pages: Array<{ title: string, component?: any }>

    constructor(private platform: Platform, private http: Http) {

        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Personal' },
            { title: 'Profile', component: ProfilePage },
            { title: 'Repositories' },
            { title: 'Repositories', component: RepoListPage },
            { title: 'Organizations' }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
              StatusBar.styleDefault();
        });
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
        var http = this.http;
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

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
