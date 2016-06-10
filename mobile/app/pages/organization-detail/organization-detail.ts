import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {ProfilePage} from '../profile/profile';
import {RepoDetailPage} from '../repo-detail/repo-detail';
import 'rxjs/add/operator/toPromise';


@Component({
    templateUrl: 'build/pages/organization-detail/organization-detail.html'
})
export class OrganizationDetail {
    org = new Object();
    people = new Array();
    repos = new Array();
    view = "repositories";

    constructor(private nav: NavController, navParams: NavParams, private http:Http) {
      var url = navParams.get('url');
      this.getOrganization(url).then(org => {
        this.org = org;
        var members_url = org.members_url.split("{")[0];
        this.getPeople(members_url).then(people => {
          this.people = people;
        });
        this.getRepoList(org.repos_url).then(repos => {
          this.repos = repos;
        });
      });
    }

    getOrganization(url) {
        var headers = new Headers();
        var token = "token " + window.localStorage.getItem("github_access_token");
        headers.append('Authorization', token);
        return this.http.get(url, { headers: headers })
            .toPromise()
            .then(response => response.json());
    }

    getPeople(url){
      var headers = new Headers();
      var token = "token " + window.localStorage.getItem("github_access_token");
      headers.append('Authorization', token);
      return this.http.get(url, { headers: headers })
          .toPromise()
          .then(response => response.json());
    }

    getRepoList(url){
      var headers = new Headers();
      var token = "token " + window.localStorage.getItem("github_access_token");
      headers.append('Authorization', token);
      return this.http.get(url, { headers: headers })
          .toPromise()
          .then(response => response.json());
    }

    viewRepo($event, repo){
      this.nav.push(RepoDetailPage, {
        repo: repo
      });
    }

    viewProfile($event, url){
      this.nav.push(ProfilePage, {
        url: url
      });
    }
}
