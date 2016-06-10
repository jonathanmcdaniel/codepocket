import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {RepoDetailPage} from '../repo-detail/repo-detail';
import 'rxjs/add/operator/toPromise';


@Component({
    templateUrl: 'build/pages/repo-list/repo-list.html'
})
export class RepoListPage {
    repoList = new Array();

    constructor(private nav: NavController, navParams: NavParams, private http:Http) {
      var url = navParams.get('url');
      if (!url){
        url = "https://api.github.com/user/repos";
      }
      this.getRepoList(url).then(repoList => {
        this.repoList = repoList;
      });
    }

    getRepoList(url) {
        var headers = new Headers();
        var token = "token " + window.localStorage.getItem("github_access_token");
        headers.append('Authorization', token);
        return this.http.get(url, { headers: headers })
            .toPromise()
            .then(response => response.json());
    }

    itemTapped(event, repo) {
      this.nav.push(RepoDetailPage, {
        repo: repo
      });
    }
}
