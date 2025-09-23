import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCode } from './recent-code';

describe('RecentCode', () => {
  let component: RecentCode;
  let fixture: ComponentFixture<RecentCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentCode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentCode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
