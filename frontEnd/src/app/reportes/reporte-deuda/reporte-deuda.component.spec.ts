import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDeudaComponent } from './reporte-deuda.component';

describe('ReporteDeudaComponent', () => {
  let component: ReporteDeudaComponent;
  let fixture: ComponentFixture<ReporteDeudaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDeudaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDeudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
