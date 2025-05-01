import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLogsComponent } from './create-logs.component';

describe('CreateLogsComponent', () => {
  let component: CreateLogsComponent;
  let fixture: ComponentFixture<CreateLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
