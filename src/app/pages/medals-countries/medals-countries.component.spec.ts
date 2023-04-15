import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalsCountriesComponent } from './medals-countries.component';

describe('MedalsCountriesComponent', () => {
  let component: MedalsCountriesComponent;
  let fixture: ComponentFixture<MedalsCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedalsCountriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MedalsCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
