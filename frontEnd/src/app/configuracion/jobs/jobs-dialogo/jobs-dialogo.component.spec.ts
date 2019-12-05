import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsDialogoComponent } from './jobs-dialogo.component';

describe('JobsDialogoComponent', () => {
  let component: JobsDialogoComponent;
  let fixture: ComponentFixture<JobsDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
