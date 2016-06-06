import {Page, NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {RepoDetailPage} from '../repo-detail/repo-detail';
import 'rxjs/add/operator/toPromise';


@Page({
    templateUrl: 'build/pages/gist-list/gist-list.html'
})
export class GistListPage {
    gistList = new Array();

    constructor(private nav: NavController, navParams: NavParams, private http:Http) {
      var url = navParams.get('url');
      if (!url){
        url = "https://api.github.com/user/repos";
      }
      this.getGistList(url).then(gistList => {
        this.gistList = gistList;
      });
    }

    getGistList(url) {
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
