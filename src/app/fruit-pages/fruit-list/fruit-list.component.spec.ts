import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitListComponent } from './fruit-list.component';

describe('FruitListComponent', () => {
  let component: FruitListComponent;
  let fixture: ComponentFixture<FruitListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FruitListComponent]
    });
    fixture = TestBed.createComponent(FruitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
