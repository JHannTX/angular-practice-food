import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitListItemComponent } from './fruit-list-item.component';

describe('FruitListItemComponent', () => {
  let component: FruitListItemComponent;
  let fixture: ComponentFixture<FruitListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FruitListItemComponent]
    });
    fixture = TestBed.createComponent(FruitListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
