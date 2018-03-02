import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../../dao/hero';
import { HeroService } from '../../service/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit{
  title = 'Tour of Heroes!';
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  /**
   * @param {Hero} hero
   */
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  /**
   * 获取英雄列表
   */
  getHeroes(): void {
    this.heroService.getHeroesSlowly().then((heroes) => {
      this.heroes = heroes;
    });
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
