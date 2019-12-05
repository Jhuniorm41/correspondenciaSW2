import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoContactoComponent } from './dialogo-contacto.component';

describe('DialogoContactoComponent', () => {
  let component: DialogoContactoComponent;
  let fixture: ComponentFixture<DialogoContactoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoContactoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
