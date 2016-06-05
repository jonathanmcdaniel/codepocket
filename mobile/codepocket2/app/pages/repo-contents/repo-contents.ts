import {Page, NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {FileReaderPage} from '../file-reader/file-reader';
import 'rxjs/add/operator/toPromise';


@Page({
    templateUrl: 'build/pages/repo-contents/repo-contents.html'
})
export class RepoContentsPage {
    files = new Array();
    activeName = "";

    constructor(private nav: NavController, navParams: NavParams, private http: Http) {
        var url = navParams.get('url');
        this.activeName = navParams.get('activeName');
        this.getContents(url).then(files => {
            this.files = files;
            console.log(files);
        });
    }

    getContents(url: string) {
        var headers = new Headers();
        var token = "token " + window.localStorage.getItem("github_access_token");
        headers.append('Authorization', token);
        return this.http.get(url, { headers: headers })
            .toPromise()
            .then(response => response.json());
    }

    itemTapped(event, file) {
        if (file.type == "file") {
            this.nav.push(FileReaderPage, {
                url: file.url
            });
        } else {
            this.nav.push(RepoContentsPage, {
                url: file.url,
                activeName: file.name
            });
        }
    }
}
