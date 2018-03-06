import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../dao/hero';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../service/hero.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  username: String;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.username = 'lijiamei';
  }

  ngOnInit(): void {
    console.log('params', this.route.params);
    /*this.heroService.getHero(this.route.params.get('id')).subscribe(hero => this.hero = hero);
    this.getHero();*/

    this.route.params.switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe((hero: Hero) => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(() => {
        return this.goBack();
      })
  }
}
