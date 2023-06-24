import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitNavigatorComponent } from './fruit-navigator.component';

describe('FruitNavigatorComponent', () => {
  let component: FruitNavigatorComponent;
  let fixture: ComponentFixture<FruitNavigatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FruitNavigatorComponent]
    });
    fixture = TestBed.createComponent(FruitNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
