import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailHomeComponent } from './cocktail-home.component';

describe('CocktailHomeComponent', () => {
  let component: CocktailHomeComponent;
  let fixture: ComponentFixture<CocktailHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocktailHomeComponent]
    });
    fixture = TestBed.createComponent(CocktailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
