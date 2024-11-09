import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDateFormComponent } from './basic-date-form.component';

describe('BasicDateFormComponent', () => {
  let component: BasicDateFormComponent;
  let fixture: ComponentFixture<BasicDateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicDateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
