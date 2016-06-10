import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {RepoContentsPage} from '../repo-contents/repo-contents';
import {ProfilePage} from '../profile/profile';
import {UserList} from '../user-list/user-list';
import 'rxjs/add/operator/toPromise';


@Component({
    templateUrl: 'build/pages/repo-detail/repo-detail.html'
})
export class RepoDetailPage {
    selectedRepo:any = new Object();

    constructor(private nav: NavController, navParams: NavParams, private http:Http) {
      this.selectedRepo = navParams.get('repo');
    }

    viewContents($event, url){
      this.nav.push(RepoContentsPage, {
        url: this.selectedRepo.url + "/contents",
        activeName: this.selectedRepo.name
      });
    }

    viewOwnerProfile($event, url){
      this.nav.push(ProfilePage, {
        url: url
      });
    }

    viewStargazers($event, url){
      this.nav.push(UserList, {
          url: url.split("{")[0]
      });
    }



}
