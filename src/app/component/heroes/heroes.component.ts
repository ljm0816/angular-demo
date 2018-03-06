import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../../dao/hero';
import { HeroService } from '../../service/hero.service';
import { QuesService } from '../../service/ques.service';

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
    private router: Router,
    private quesService: QuesService
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
    this.heroService.getHeroes().then((heroes) => {
      console.log('heroes', heroes)
      this.heroes = heroes;
    });
  }

  add(name: String): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.create(name).then((hero) => {
      this.heroes.push(hero);
      this.selectedHero = null;
    })
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
