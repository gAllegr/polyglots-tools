import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Modal to alert user there is a new update available.
 */
@Component({
  selector: 'app-update-available',
  templateUrl: './update-available.component.html'
})
export class UpdateAvailableComponent {
  constructor(private readonly modal: NgbActiveModal) {}

  /**
   * Close the modal and choose to not update.
   *
   * @returns {void} Nothing.
   */
  public dismiss(): void {
    this.modal.dismiss();
  }

  /**
   * Close the modal and choose to update.
   *
   * @returns {void} Nothing.
   */
  public confirm(): void {
    this.modal.close();
  }
}
