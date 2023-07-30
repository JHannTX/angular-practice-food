import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fd-cocktail-navigator',
  templateUrl: './cocktail-navigator.component.html',
  styleUrls: ['./cocktail-navigator.component.css']
})
export class CocktailNavigatorComponent {
  @Input() isComingFromHome: boolean = false;

  prefix: string = '../..'
  
  // constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    if(this.isComingFromHome) {
      this.prefix = '../cocktail';
    }
  }
}
