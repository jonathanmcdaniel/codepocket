import {Page, NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {RepoContentsPage} from '../repo-contents/repo-contents';
import 'rxjs/add/operator/toPromise';


@Page({
    templateUrl: 'build/pages/repo-detail/repo-detail.html'
})
export class RepoDetailPage {
    selectedRepo:any = new Object();

    constructor(private nav: NavController, navParams: NavParams, private http:Http) {
      this.selectedRepo = navParams.get('repo');

    }

    viewContents(event, url){
      this.nav.push(RepoContentsPage, {
        url: this.selectedRepo.url + "/contents",
        activeName: this.selectedRepo.name
      });
    }

    /*getRepoDetail() {
        var headers = new Headers();
        var token = "token " + window.localStorage.getItem("github_access_token");
        headers.append('Authorization', token);
        return this.http.get("https://api.github.com/users/jonathanmcdaniel/repos", { headers: headers })
            .toPromise()
            .then(response => response.json());
    }*/
}
