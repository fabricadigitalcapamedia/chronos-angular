import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridChronosComponent } from './GridChronosComponent';

describe('GridChronosComponent', () => {
  let component: GridChronosComponent;
  let fixture: ComponentFixture<GridChronosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridChronosComponent]
    });
    fixture = TestBed.createComponent(GridChronosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
