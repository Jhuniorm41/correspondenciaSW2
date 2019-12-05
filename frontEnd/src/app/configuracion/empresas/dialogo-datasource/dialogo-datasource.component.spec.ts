import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoDatasourceComponent } from './dialogo-datasource.component';

describe('DialogoDatasourceComponent', () => {
  let component: DialogoDatasourceComponent;
  let fixture: ComponentFixture<DialogoDatasourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoDatasourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoDatasourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
