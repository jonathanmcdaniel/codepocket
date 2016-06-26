import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {ProfilePage} from '../profile/profile';
import {RepoDetailPage} from '../repo-detail/repo-detail';
import 'rxjs/add/operator/toPromise';


@Component({
    templateUrl: 'build/pages/events/events.html'
})
export class EventsList {
    events = new Array();
    url;

    constructor(private nav: NavController, navParams: NavParams, private http:Http) {
      this.url = navParams.get('url');
      if (!this.url) {
          this.url = "https://api.github.com/events";
      }
      this.getEvents(this.url).then(events => {
        this.events = events;
      });
    }

    getEvents(url) {
        var headers = new Headers();
        var token = "token " + window.localStorage.getItem("github_access_token");
        headers.append('Authorization', token);
        return this.http.get(url, { headers: headers })
            .toPromise()
            .then(response => response.json());
    }

    refresh(refresher){
      this.getEvents(this.url).then(events => {
        this.events = events;
        refresher.complete();
      });
    }

    viewProfile($event, url){
      this.nav.push(ProfilePage, {
          url: url
      });
    }

    viewRepo($event, repo){
      this.nav.push(RepoDetailPage, {
        repo: repo
      });
    }
}
