import {Page} from 'ionic-angular';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Page({
    templateUrl: 'build/pages/profile/profile.html'
})
export class ProfilePage {
    user = new Object();

    constructor(http: Http) {
        this.getProfile(http).then(user => this.user = user);
    }

    getProfile(http: Http) {
        var headers = new Headers();
        var token = "token " + window.localStorage.getItem("github_access_token");
        headers.append('Authorization', token);
        return http.get("https://api.github.com/users/jonathanmcdaniel", { headers: headers })
            .toPromise()
            .then(response => response.json());
    }
}
