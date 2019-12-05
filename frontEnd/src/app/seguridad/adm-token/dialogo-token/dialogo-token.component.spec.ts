import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoTokenComponent } from './dialogo-token.component';

describe('DialogoTokenComponent', () => {
  let component: DialogoTokenComponent;
  let fixture: ComponentFixture<DialogoTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
