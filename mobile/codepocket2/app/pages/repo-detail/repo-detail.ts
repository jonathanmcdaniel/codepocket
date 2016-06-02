import {Page} from 'ionic-angular';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Page({
    templateUrl: 'build/pages/repo-detail/repo-detail.html'
})
export class RepoDetailPage {
    repo = new Object();

    constructor(http:Http) {
      this.getRepoDetail(http).then(repo => this.repo = repo);
    }

    getRepoDetail(http: Http) {
        var headers = new Headers();
        var token = "token " + window.localStorage.getItem("github_access_token");
        headers.append('Authorization', token);
        return http.get("https://api.github.com/users/jonathanmcdaniel/repos", { headers: headers })
            .toPromise()
            .then(response => response.json());
    }
}
