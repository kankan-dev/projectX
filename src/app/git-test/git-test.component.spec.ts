import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitTestComponent } from './git-test.component';

describe('GitTestComponent', () => {
  let component: GitTestComponent;
  let fixture: ComponentFixture<GitTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
