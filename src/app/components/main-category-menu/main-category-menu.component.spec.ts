import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCategoryMenuComponent } from './main-category-menu.component';

describe('MainCategoryMenuComponent', () => {
  let component: MainCategoryMenuComponent;
  let fixture: ComponentFixture<MainCategoryMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCategoryMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
