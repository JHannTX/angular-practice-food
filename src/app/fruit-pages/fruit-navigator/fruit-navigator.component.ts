import { Component, Input } from '@angular/core';

@Component({
  selector: 'fd-fruit-navigator',
  templateUrl: './fruit-navigator.component.html',
  styleUrls: ['./fruit-navigator.component.css']
})
export class FruitNavigatorComponent {
  // Bindable
  @Input() isComingFromHome: boolean = false;
  @Input() isComingFromDetails: boolean = false;


  // For use with component
  prefix: string = '..';

  ngOnInit() {
    if(this.isComingFromHome) {
      this.prefix = '../fruit';
    } else if(this.isComingFromDetails) {
      this.prefix = '../..'
    }
  }
}
