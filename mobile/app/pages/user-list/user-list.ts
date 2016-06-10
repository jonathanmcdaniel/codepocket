import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {ProfilePage} from '../profile/profile';
import 'rxjs/add/operator/toPromise';

@Component({
    templateUrl: 'build/pages/user-list/user-list.html'
})
export class UserList {
    followers = new Array();

    constructor(private nav: NavController, navParams: NavParams, private http:Http) {
        var url = navParams.get('url');
        this.getFollowers(url).then(followers => this.followers = followers);
    }

    getFollowers(url:string) {
        var headers = new Headers();
        var token = "token " + window.localStorage.getItem("github_access_token");
        headers.append('Authorization', token);
        return this.http.get(url, { headers: headers })
            .toPromise()
            .then(response => response.json());
    }

    viewProfile($event, url){
      this.nav.push(ProfilePage, {
          url: url
      });
    }
}
