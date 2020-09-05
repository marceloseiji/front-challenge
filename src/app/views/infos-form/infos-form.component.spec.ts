import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosFormComponent } from './infos-form.component';

describe('InfosFormComponent', () => {
  let component: InfosFormComponent;
  let fixture: ComponentFixture<InfosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
