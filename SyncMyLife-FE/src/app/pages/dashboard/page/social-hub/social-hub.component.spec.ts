import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialHubComponent } from './social-hub.component';

describe('OrganizerComponent', () => {
  let component: SocialHubComponent;
  let fixture: ComponentFixture<SocialHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialHubComponent]
    });
    fixture = TestBed.createComponent(SocialHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
