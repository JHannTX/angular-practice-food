import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailNavigatorComponent } from './cocktail-navigator.component';

describe('CocktailNavigatorComponent', () => {
  let component: CocktailNavigatorComponent;
  let fixture: ComponentFixture<CocktailNavigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailNavigatorComponent]
    });
    fixture = TestBed.createComponent(CocktailNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
