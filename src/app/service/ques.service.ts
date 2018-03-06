import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Hero } from '../dao/hero';
/*import { HEROES } from '../mock/mock-heroes';*/

import 'rxjs/add/operator/toPromise'

@Injectable()
export class QuesService {
  private quesUrl = 'http://test.kanlouyi.com/weixin/category/classList';  // URL to web api

  constructor(private http: Http) {}

  getQuesList(): Promise<void> {
    return this.http.get(this.quesUrl)
      .toPromise()
      .then((res) => {
        console.log('ljm', res)
      })
      .catch(this.handleError);
  } //stub

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

