import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionViewComponent } from './edition-view.component';

describe('EditionViewComponent', () => {
  let component: EditionViewComponent;
  let fixture: ComponentFixture<EditionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
