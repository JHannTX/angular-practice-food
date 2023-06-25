import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fruit } from 'src/app/services/fruits.service';

@Component({
  selector: 'fd-fruit-list',
  templateUrl: './fruit-list.component.html',
  styleUrls: ['./fruit-list.component.css']
})
export class FruitListComponent {
  fruits: Fruit[] = [];
  needSearch: boolean = false;
  needSelector: boolean = false;
  
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe((paramMap) => {
        this.needSearch = false;
        this.needSelector = false;
        let type = paramMap.get('type');
        if(type?.toLowerCase() === 'nutrition') {
          this.needSelector = true;
        } else if(type?.toLowerCase() !== 'all') {
          this.needSearch = true;
        }
      });
  }
}
