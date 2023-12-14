import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraOrganizacionalComponent } from './estructura-organizacional.component';

describe('EstructuraOrganizacionalComponent', () => {
  let component: EstructuraOrganizacionalComponent;
  let fixture: ComponentFixture<EstructuraOrganizacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstructuraOrganizacionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstructuraOrganizacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
