import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnAddComponent } from './turn-add.component';

describe('TurnAddComponent', () => {
  let component: TurnAddComponent;
  let fixture: ComponentFixture<TurnAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
