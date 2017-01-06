import { Attribute, Directive, ElementRef, Renderer, Input } from '@angular/core';

import { Config } from '../../config/config';
import { Ion } from '../ion';


/**
 * @name Label
 * @description
 * Labels are placed inside of an `ion-item` element and can be used
 * to describe an `ion-input`, `ion-toggle`, `ion-checkbox`, and more. 
 * There are several different styles of Labels available, each with a
 * different look and behavior. For more information, see [Attributes](#attributes) 
 * below.
 *
 * @property [fixed] - A persistent label that sits next the input.
 * @property [floating] - A label that will float above the input if the input is empty or loses focus.
 * @property [stacked] - A stacked label will always appear on top of the input.
 *
 * @usage
 * ```html
 *  <ion-item>
 *    <ion-label>Username</ion-label>
 *    <ion-input></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label floating>Toggle</ion-label>
 *    <ion-toggle></ion-toggle>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label stacked>Checkbox</ion-label>
 *    <ion-checkbox></ion-checkbox>
 *  </ion-item>
 * ```
 *
 * @demo /docs/v2/demos/src/label/basic
 * @see {@link ../../../../components#inputs Input Component Docs}
 * @see {@link ../../input/Input Input API Docs}
 *
 */

@Directive({
  selector: 'ion-label'
})
export class Label extends Ion {
  private _id: string;

  /**
   * @input {string} The predefined color to use. For example: `"primary"`, `"secondary"`, `"danger"`.
   */
  @Input()
  set color(val: string) {
    this._setColor(val);
  }

  /**
   * @input {string} The mode to apply to this component.
   */
  @Input()
  set mode(val: string) {
    this._setMode(val);
  }

  /**
   * @private
   */
  type: string;

  constructor(
    config: Config,
    elementRef: ElementRef,
    renderer: Renderer,
    @Attribute('floating') isFloating: string,
    @Attribute('stacked') isStacked: string,
    @Attribute('fixed') isFixed: string,
    @Attribute('inset') isInset: string
  ) {
    super(config, elementRef, renderer, 'label');
    this.type = (isFloating === '' ? 'floating' : (isStacked === '' ? 'stacked' : (isFixed === '' ? 'fixed' : (isInset === '' ? 'inset' : null))));
  }

  /**
   * @private
   */
  @Input()
  get id(): string {
    return this._id;
  }

  set id(val: string) {
    this._id = val;
    if (val) {
      this.setElementAttribute('id', val);
    }
  }

  /**
   * @private
   */
  get text(): string {
    return this.getNativeElement().textContent || '';
  }

}
