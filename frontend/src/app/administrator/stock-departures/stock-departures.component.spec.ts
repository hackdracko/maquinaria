import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {StockDeparturesComponent} from "./stock-departures.component";

describe('StockDeparturesComponent', () => {
  let component: StockDeparturesComponent;
  let fixture: ComponentFixture<StockDeparturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDeparturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDeparturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
