import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GutenbergResultsComponent } from './gutenberg-results.component';

describe('GutenbergResultsComponent', () => {
  let component: GutenbergResultsComponent;
  let fixture: ComponentFixture<GutenbergResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GutenbergResultsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GutenbergResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
