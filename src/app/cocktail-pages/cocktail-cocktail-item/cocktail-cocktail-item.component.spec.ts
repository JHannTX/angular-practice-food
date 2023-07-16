import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailCocktailItemComponent } from './cocktail-cocktail-item.component';

describe('CocktailCocktailItemComponent', () => {
  let component: CocktailCocktailItemComponent;
  let fixture: ComponentFixture<CocktailCocktailItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailCocktailItemComponent]
    });
    fixture = TestBed.createComponent(CocktailCocktailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
