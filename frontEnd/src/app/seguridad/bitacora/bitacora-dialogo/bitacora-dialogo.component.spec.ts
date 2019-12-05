import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraDialogoComponent } from './bitacora-dialogo.component';

describe('BitacoraDialogoComponent', () => {
  let component: BitacoraDialogoComponent;
  let fixture: ComponentFixture<BitacoraDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitacoraDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
