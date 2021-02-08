import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GutenbergStringComparatorComponent } from './gutenberg-string-comparator.component';

describe('GutenbergStringComparatorComponent', () => {
  let component: GutenbergStringComparatorComponent;
  let fixture: ComponentFixture<GutenbergStringComparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GutenbergStringComparatorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GutenbergStringComparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
