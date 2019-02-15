import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { CyclesComponent } from './cycles.component';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { CycleService } from "../_services";

describe('CyclesComponent', () => {
  let component: CyclesComponent;
  let fixture: ComponentFixture<CyclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CyclesComponent],
      providers: [
        CycleService
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ClarityModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
