import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoAsignacionComponent } from './dialogo-asignacion.component';

describe('DialogoAsignacionComponent', () => {
  let component: DialogoAsignacionComponent;
  let fixture: ComponentFixture<DialogoAsignacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoAsignacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
