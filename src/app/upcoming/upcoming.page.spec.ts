import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { UpcomingPage } from './upcoming.page';

describe('UpcomingPage', () => {
  let component: UpcomingPage;
  let fixture: ComponentFixture<UpcomingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpcomingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
