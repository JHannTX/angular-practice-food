import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitDetailsComponent } from './fruit-details.component';

describe('FruitDetailsComponent', () => {
  let component: FruitDetailsComponent;
  let fixture: ComponentFixture<FruitDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FruitDetailsComponent]
    });
    fixture = TestBed.createComponent(FruitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
