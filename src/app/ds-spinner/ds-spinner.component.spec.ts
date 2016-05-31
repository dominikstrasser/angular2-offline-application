import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DsSpinnerComponent } from './ds-spinner.component';

describe('Component: DsSpinner', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [DsSpinnerComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([DsSpinnerComponent],
      (component: DsSpinnerComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(DsSpinnerComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(DsSpinnerComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-ds-spinner></app-ds-spinner>
  `,
  directives: [DsSpinnerComponent]
})
class DsSpinnerComponentTestController {
}

