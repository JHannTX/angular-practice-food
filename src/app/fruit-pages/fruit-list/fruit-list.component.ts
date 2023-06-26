import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Fruit, FruitsService } from 'src/app/services/fruits.service';

@Component({
  selector: 'fd-fruit-list',
  templateUrl: './fruit-list.component.html',
  styleUrls: ['./fruit-list.component.css']
})
export class FruitListComponent {
  type: string = '';
  needSearch: boolean = false;
  needSelector: boolean = false;

  fruits$?: Observable<Fruit[]>;
  
  constructor(private activatedRoute: ActivatedRoute, private fruitService: FruitsService) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe((paramMap) => {
        this.needSearch = false;
        this.needSelector = false;
        this.type = paramMap.get('type')!;
        if(this.type?.toLowerCase() === 'nutrition') {
          this.needSelector = true;
        } else if(this.type?.toLowerCase() !== 'all') {
          this.needSearch = true;
        }
      });

    this.fruits$ = this.fruitService.all();
  }
}
