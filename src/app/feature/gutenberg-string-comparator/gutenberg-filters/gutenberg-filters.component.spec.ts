import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GutenbergFiltersComponent } from './gutenberg-filters.component';

describe('GutenbergFiltersComponent', () => {
  let component: GutenbergFiltersComponent;
  let fixture: ComponentFixture<GutenbergFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GutenbergFiltersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GutenbergFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
