import { Injectable } from '@angular/core';

import { App } from '../app/app';
import { AppPortal } from '../app/app-root';
import { isPresent } from '../../util/util';
import { ModalCmp } from './modal-component';
import { ModalOptions } from './modal-options';
import { NavOptions } from '../../navigation/nav-util';
import { ViewController } from '../../navigation/view-controller';


/**
 * @private
 */
export class Modal extends ViewController {
  private _app: App;
  private _enterAnimation: string;
  private _leaveAnimation: string;

  constructor(app: App, component: any, data: any, opts: ModalOptions = {}) {
    data = data || {};
    data.component = component;
    opts.showBackdrop = isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
    opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
    data.opts = opts;

    super(ModalCmp, data, null);
    this._app = app;
    this._enterAnimation = opts.enterAnimation;
    this._leaveAnimation = opts.leaveAnimation;

    this.isOverlay = true;
  }

  /**
   * @private
   */
  getTransitionName(direction: string): string {
    let key: string;
    if (direction === 'back') {
      if (this._leaveAnimation) {
        return this._leaveAnimation;
      }
      key = 'modalLeave';
    } else {
      if (this._enterAnimation) {
        return this._enterAnimation;
      }
      key = 'modalEnter';
    }
    return this._nav && this._nav.config.get(key);
  }

  /**
   * Present the action sheet instance.
   *
   * @param {NavOptions} [opts={}] Nav options to go with this transition.
   * @returns {Promise} Returns a promise which is resolved when the transition has completed.
   */
  present(navOptions: NavOptions = {}) {
    return this._app.present(this, navOptions, AppPortal.MODAL);
  }

}


/**
 * @name ModalController
 * @description
 * A Modal is a content pane that goes over the user's current page.
 * Usually it is used for making a choice or editing an item. A modal uses the
 * `NavController` to
 * {@link /docs/v2/api/components/nav/NavController/#present present}
 * itself in the root nav stack. It is added to the stack similar to how
 * {@link /docs/v2/api/components/nav/NavController/#push NavController.push}
 * works.
 *
 * When a modal (or any other overlay such as an alert or actionsheet) is
 * "presented" to a nav controller, the overlay is added to the app's root nav.
 * After the modal has been presented, from within the component instance The
 * modal can later be closed or "dismissed" by using the ViewController's
 * `dismiss` method. Additionally, you can dismiss any overlay by using `pop`
 * on the root nav controller. Modals are not reusable. When a modal is dismissed
 * it is destroyed.
 *
 * Data can be passed to a new modal through `Modal.create()` as the second
 * argument. The data can then be accessed from the opened page by injecting
 * `NavParams`. Note that the page, which opened as a modal, has no special
 * "modal" logic within it, but uses `NavParams` no differently than a
 * standard page.
 *
 * @usage
 * ```ts
 * import { ModalController, NavParams } from 'ionic-angular';
 *
 * @Component(...)
 * class HomePage {
 *
 *  constructor(public modalCtrl: ModalController) {
 *
 *  }
 *
 *  presentProfileModal() {
 *    let profileModal = this.modalCtrl.create(Profile, { userId: 8675309 });
 *    profileModal.present();
 *  }
 *
 * }
 *
 * @Component(...)
 * class Profile {
 *
 *  constructor(params: NavParams) {
 *    console.log('UserId', params.get('userId'));
 *  }
 *
 * }
 * ```
 *
 * @advanced
 *
 * | Option                | Type       | Description                                                                                                      |
 * |-----------------------|------------|------------------------------------------------------------------------------------------------------------------|
 * | showBackdrop          |`boolean`   | Whether to show the backdrop. Default true.                                                                      |
 * | enableBackdropDismiss |`boolean`   | Whether the popover should be dismissed by tapping the backdrop. Default true.                                   |
 *
 * A modal can also emit data, which is useful when it is used to add or edit
 * data. For example, a profile page could slide up in a modal, and on submit,
 * the submit button could pass the updated profile data, then dismiss the
 * modal.
 *
 * ```ts
 * import { Component } from '@angular/core';
 * import { ModalController, ViewController } from 'ionic-angular';
 *
 * @Component(...)
 * class HomePage {
 *
 *  constructor(public modalCtrl: ModalController) {
 *
 *  }
 *
 *  presentContactModal() {
 *    let contactModal = this.modalCtrl.create(ContactUs);
 *    contactModal.present();
 *  }
 *
 *  presentProfileModal() {
 *    let profileModal = this.modalCtrl.create(Profile, { userId: 8675309 });
 *    profileModal.onDidDismiss(data => {
 *      console.log(data);
 *    });
 *    profileModal.present();
 *  }
 *
 * }
 *
 * @Component(...)
 * class Profile {
 *
 *  constructor(public viewCtrl: ViewController) {
 *
 *  }
 *
 *  dismiss() {
 *    let data = { 'foo': 'bar' };
 *    this.viewCtrl.dismiss(data);
 *  }
 *
 * }
 * ```
 * @demo /docs/v2/demos/src/modal/basic
 * @see {@link /docs/v2/components#modals Modal Component Docs}
 */
@Injectable()
export class ModalController {

  constructor(private _app: App) {}
  /**
   * Create a modal to display. See below for options.
   *
   * @param {object} component The Modal view
   * @param {object} data Any data to pass to the Modal view
   * @param {object} opts Modal options
   */
  create(component: any, data: any = {}, opts: ModalOptions = {}) {
    return new Modal(this._app, component, data, opts);
  }
}
