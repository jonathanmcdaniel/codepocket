import {Page, NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {RepoDetailPage} from '../repo-detail/repo-detail';
import 'rxjs/add/operator/toPromise';


@Page({
    templateUrl: 'build/pages/repo-list/repo-list.html'
})
export class RepoListPage {
    repoList = new Array();

    constructor(private nav: NavController, navParams: NavParams, private http:Http) {
      this.getRepoList().then(repoList => {
        this.repoList = repoList;
        console.log(repoList);
      });
    }

    getRepoList() {
        var headers = new Headers();
        var token = "token " + window.localStorage.getItem("github_access_token");
        headers.append('Authorization', token);
        return this.http.get("https://api.github.com/user/repos", { headers: headers })
            .toPromise()
            .then(response => response.json());
    }

    itemTapped(event, repo) {
      this.nav.push(RepoDetailPage, {
        repo: repo
      });
    }
}
