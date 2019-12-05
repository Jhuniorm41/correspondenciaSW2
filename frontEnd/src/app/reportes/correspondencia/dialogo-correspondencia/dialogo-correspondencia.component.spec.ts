import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCorrespondenciaComponent } from './dialogo-correspondencia.component';

describe('DialogoCorrespondenciaComponent', () => {
  let component: DialogoCorrespondenciaComponent;
  let fixture: ComponentFixture<DialogoCorrespondenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoCorrespondenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
