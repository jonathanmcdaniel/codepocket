import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {ProfilePage} from '../profile/profile';
import {RepoDetailPage} from '../repo-detail/repo-detail';
import {api} from '../../services/api'
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: 'build/pages/events/events.html',
    providers: [api]
})

export class EventsList {
    events = new Array();
    url;

    constructor(private nav: NavController, navParams: NavParams, private http:Http, private api: api) {
      this.url = navParams.get('url');
      if (!this.url) {
          this.url = "https://api.github.com/events";
      }
      this.getEvents(this.url);
    }

    getEvents(url) {
      this.api.get(this.url).subscribe(
          data => {
            // If Success
            this.events = data;
          },
          err => {
            // If Error
            console.log(err);
          },
          () => {
            // Always
          }
      );
    }

    refresh(refresher){
      this.api.get(this.url).subscribe(
          data => {
            // If Success
            this.events = data;
            refresher.complete();
          },
          err => {
            // If Error
            console.log(err);
          },
          () => {
            // Always
          }
      );
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