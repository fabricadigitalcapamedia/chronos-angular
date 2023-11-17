import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJsonComponent } from './modal-json.component';

describe('ModalJsonComponent', () => {
  let component: ModalJsonComponent;
  let fixture: ComponentFixture<ModalJsonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalJsonComponent]
    });
    fixture = TestBed.createComponent(ModalJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
