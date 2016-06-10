import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {UserList} from '../user-list/user-list';
import {RepoListPage} from '../repo-list/repo-list';
import {GistListPage} from '../gist-list/gist-list';
import {OrganizationsPage} from '../organizations/organizations';
import {EventsList} from '../events/events';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: 'build/pages/profile/profile.html'
})
export class ProfilePage {
    user = new Object();
    followers = new Array();

    constructor(private nav: NavController, navParams: NavParams, private http: Http) {
        var url = navParams.get('url');
        if (!url) {
            url = "https://api.github.com/users/jonathanmcdaniel";
        }
        this.getProfile(url).then(user => this.user = user);
    }

    getProfile(url) {
        var headers = new Headers();
        var token = "token " + window.localStorage.getItem("github_access_token");
        headers.append('Authorization', token);
        return this.http.get(url, { headers: headers })
            .toPromise()
            .then(response => response.json());
    }

    viewFollowers($event, url) {
        this.nav.push(UserList, {
            url: url
        });
    }

    viewFollowing($event, url) {
        this.nav.push(UserList, {
            url: url.split("{")[0]
        });
    }

    viewRepos($event, url) {
        this.nav.push(RepoListPage, {
            url: url.split("{")[0]
        });
    }

    viewStarredRepos($event, url) {
        var nUrl = url.split("{")[0];
        console.log(nUrl);
        this.nav.push(RepoListPage, {
            url: nUrl
        });
    }

    viewGists($event, url){
      this.nav.push(GistListPage, {
          url: url.split("{")[0]
      });
    }

    viewOrganizations($event, url) {
      this.nav.push(OrganizationsPage, {
          url: url
      });
    }

    viewEvents($event, url) {
      this.nav.push(EventsList, {
          url: url.split("{")[0]
      });
    }

}
