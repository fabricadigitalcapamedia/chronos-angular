import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallazgosComponent } from './hallazgos.component';

describe('HallazgosComponent', () => {
  let component: HallazgosComponent;
  let fixture: ComponentFixture<HallazgosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HallazgosComponent]
    });
    fixture = TestBed.createComponent(HallazgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
