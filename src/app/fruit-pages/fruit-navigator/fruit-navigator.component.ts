import { Component, Input } from '@angular/core';

@Component({
  selector: 'fd-fruit-navigator',
  templateUrl: './fruit-navigator.component.html',
  styleUrls: ['./fruit-navigator.component.css']
})
export class FruitNavigatorComponent {
  // Bindable
  @Input() isComingFromList: boolean = true;

  // For use with component
  prefix: string = '..';

  ngOnInit() {
    if(!this.isComingFromList) {
      this.prefix = '../fruit';
    }
  }
}
