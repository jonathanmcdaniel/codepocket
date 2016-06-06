import {Page, NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {OrganizationDetail} from '../organization-detail/organization-detail';
import 'rxjs/add/operator/toPromise';


@Page({
    templateUrl: 'build/pages/organizations/organizations.html'
})
export class OrganizationsPage {
    orgs = new Array();

    constructor(private nav: NavController, navParams: NavParams, private http:Http) {
      var url = navParams.get('url');
      this.getOrganizationList(url).then(orgs => {
        this.orgs = orgs;
      });
    }

    getOrganizationList(url) {
        var headers = new Headers();
        var token = "token " + window.localStorage.getItem("github_access_token");
        headers.append('Authorization', token);
        return this.http.get(url, { headers: headers })
            .toPromise()
            .then(response => response.json());
    }

    itemTapped(event, url) {
      this.nav.push(OrganizationDetail, {
          url: url
      });
    }
}
