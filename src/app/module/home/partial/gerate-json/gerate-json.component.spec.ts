import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerateJsonComponent } from './gerate-json.component';

describe('GerateJsonComponent', () => {
  let component: GerateJsonComponent;
  let fixture: ComponentFixture<GerateJsonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerateJsonComponent]
    });
    fixture = TestBed.createComponent(GerateJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
