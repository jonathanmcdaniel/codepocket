import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProfileSvc {

    http;
    constructor(http: Http) {
          this.http = http;
    }
}
