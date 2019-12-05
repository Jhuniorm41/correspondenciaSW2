import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoRecursoComponent } from './dialogo-recurso.component';

describe('DialogoRecursoComponent', () => {
  let component: DialogoRecursoComponent;
  let fixture: ComponentFixture<DialogoRecursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoRecursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
