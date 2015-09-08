import {Injectable} from 'angular2/angular2';

import {Overlay} from '../overlay/overlay';
import {Animation} from '../../animations/animation';
import * as util from 'ionic/util';

/**
 * @name ionModal
 * @classdesc
 * The Modal is a content pane that can go over the user's main view temporarily. Usually used for making a choice or editing an item.
 *
 * @example
 * ```ts
 * class MyApp {
 * 
 *  constructor(modal: Modal, app: IonicApp, ionicConfig: IonicConfig) {
 *    this.modal = modal;
 *  }
 * 
 *  openModal() {
 *    this.modal.open(ContactModal, {
 *      enterAnimation: 'my-fade-in',
 *      leaveAnimation: 'my-fade-out',
 *      handle: 'my-modal'
 *    });
 *  }
 * }
 * ```
 */
@Injectable()
export class Modal extends Overlay {

  /**
   * TODO
   * @param {Type} ComponentType  TODO
   * @param {Object} [opts={}]  TODO
   * @returns {TODO} TODO
   */
  open(ComponentType: Type, opts={}) {
    let defaults = {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out',
    };

    return this.create(OVERLAY_TYPE, ComponentType, util.extend(defaults, opts));
  }

  /**
   * TODO
   * @param {TODO} handle  TODO
   * @returns {TODO} TODO
   */
  get(handle) {
    if (handle) {
      return this.getByHandle(handle, OVERLAY_TYPE);
    }
    return this.getByType(OVERLAY_TYPE);
  }

}

const OVERLAY_TYPE = 'modal';


/**
 * Animations for modals
 */
class ModalSlideIn extends Animation {
  constructor(element) {
    super(element);
    this
      .easing('cubic-bezier(.36,.66,.04,1)')
      .duration(400)
      .fromTo('translateY', '100%', '0%');
  }
}
Animation.register('modal-slide-in', ModalSlideIn);


class ModalSlideOut extends Animation {
  constructor(element) {
    super(element);
    this
      .easing('ease-out')
      .duration(250)
      .fromTo('translateY', '0%', '100%');
  }
}
Animation.register('modal-slide-out', ModalSlideOut);