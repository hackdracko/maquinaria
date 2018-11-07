import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockEntriesComponent } from './stock-add.component';

describe('StockAddComponent', () => {
  let component: StockEntriesComponent;
  let fixture: ComponentFixture<StockEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
