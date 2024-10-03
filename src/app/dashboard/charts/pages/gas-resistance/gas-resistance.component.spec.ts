import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasResistanceComponent } from './gas-resistance.component';

describe('GasResistanceComponent', () => {
  let component: GasResistanceComponent;
  let fixture: ComponentFixture<GasResistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GasResistanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GasResistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
