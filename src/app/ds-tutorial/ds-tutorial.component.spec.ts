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
import { DsTutorialComponent } from './ds-tutorial.component';

describe('Component: DsTutorial', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [DsTutorialComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([DsTutorialComponent],
      (component: DsTutorialComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(DsTutorialComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(DsTutorialComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-ds-tutorial></app-ds-tutorial>
  `,
  directives: [DsTutorialComponent]
})
class DsTutorialComponentTestController {
}

