import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocenteqrPage } from './docenteqr.page';

describe('DocenteqrPage', () => {
  let component: DocenteqrPage;
  let fixture: ComponentFixture<DocenteqrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
