import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAccount } from './type-account';

describe('TypeAccount', () => {
  let component: TypeAccount;
  let fixture: ComponentFixture<TypeAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
