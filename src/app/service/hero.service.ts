import { Injectable } from '@angular/core';
import { Hero } from '../dao/hero';
import { HEROES } from '../mock/mock-heroes';

import { Http, Headers } from '@angular/http'; //引入http类，作异步请求

import 'rxjs/add/operator/toPromise'

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    // return  Promise.resolve(HEROES);
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then((res) => {
        return res.json().data as Hero[]
      })
      .catch(this.handleError)

  } // stub

  /**
   * 延迟两秒显示英雄列表
   * @returns {Promise<Hero[]>}
   */
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    console.log('url', url);
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => {
          return hero;
      })
      .catch(this.handleError)
  }

  create(name: String): Promise<Hero> {
    return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError)
  }

  // 请求异常处理
  private handleError(error: any): Promise<any>{
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

