import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmTokenComponent } from './adm-token.component';

describe('AdmTokenComponent', () => {
  let component: AdmTokenComponent;
  let fixture: ComponentFixture<AdmTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
