import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoUsuarioComponent } from './dialogo-usuario.component';

describe('DialogoUsuarioComponent', () => {
  let component: DialogoUsuarioComponent;
  let fixture: ComponentFixture<DialogoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
