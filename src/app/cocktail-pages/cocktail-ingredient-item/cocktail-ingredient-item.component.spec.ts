import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailIngredientItemComponent } from './cocktail-ingredient-item.component';

describe('CocktailIngredientItemComponent', () => {
  let component: CocktailIngredientItemComponent;
  let fixture: ComponentFixture<CocktailIngredientItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailIngredientItemComponent]
    });
    fixture = TestBed.createComponent(CocktailIngredientItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
