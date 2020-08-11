import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishCategoryComponent } from './fish-category.component';

describe('FishCategoryComponent', () => {
  let component: FishCategoryComponent;
  let fixture: ComponentFixture<FishCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
