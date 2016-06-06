import {Page, NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Page({
    templateUrl: 'build/pages/events/events.html'
})
export class EventsList {
    events = new Array();

    constructor(private nav: NavController, navParams: NavParams, private http:Http) {
      var url = navParams.get('url');
      this.getEvents(url).then(events => {
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
}
