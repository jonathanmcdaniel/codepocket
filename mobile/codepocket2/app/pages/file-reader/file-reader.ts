import {Page, NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var hljs: any;
@Page({
    templateUrl: 'build/pages/file-reader/file-reader.html'
})
export class FileReaderPage {
    file = new Object();

    constructor(private nav: NavController, navParams: NavParams, private http: Http) {
        var url = navParams.get('url');
        this.getFileContent(url).then(file => {
            this.file = file;
            var content: any = hljs.highlightAuto(atob(file.content).replace("//n", '<br/>'));
            document.getElementById("code").innerHTML = content.value;
        });
    }

    getFileContent(url: string) {
        var headers = new Headers();
        var token = "token " + window.localStorage.getItem("github_access_token");
        headers.append('Authorization', token);
        return this.http.get(url, { headers: headers })
            .toPromise()
            .then(response => response.json());
    }
}
