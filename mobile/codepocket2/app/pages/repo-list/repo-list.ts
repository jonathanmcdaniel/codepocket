import {Page} from 'ionic-angular';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Page({
    templateUrl: 'build/pages/repo-list/repo-list.html'
})
export class RepoListPage {
    repoList = new Array();

    constructor(http:Http) {
      this.getRepoList(http).then(repoList => this.repoList = repoList);
    }

    getRepoList(http: Http) {
        var headers = new Headers();
        var token = "token " + window.localStorage.getItem("github_access_token");
        headers.append('Authorization', token);
        return http.get("https://api.github.com/user/repos", { headers: headers })
            .toPromise()
            .then(response => response.json());
    }
}
