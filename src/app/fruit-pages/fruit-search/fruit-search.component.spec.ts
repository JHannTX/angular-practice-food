import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitSearchComponent } from './fruit-search.component';

describe('FruitSearchComponent', () => {
  let component: FruitSearchComponent;
  let fixture: ComponentFixture<FruitSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FruitSearchComponent]
    });
    fixture = TestBed.createComponent(FruitSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
