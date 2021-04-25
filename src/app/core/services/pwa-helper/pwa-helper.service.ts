import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, switchMap } from 'rxjs/operators';
import { UpdateAvailableComponent } from 'src/app/shared/components/update-available/update-available/update-available.component';

/**
 * Service that contains method useful for managing PWA.
 */
@Injectable({
  providedIn: 'root'
})
export class PwaHelperService {
  constructor(
    private readonly swUpdate: SwUpdate,
    private readonly applicationRef: ApplicationRef,
    private readonly modal: NgbModal
  ) {}

  /**
   * If the service worker is avaliable, and once the application
   * is stable, check if there is any update available.
   *
   * Then ask the user if he7she wants to relead the app now or later.
   *
   * @returns {void} Nothing.
   */
  public checkNewVersion(): void {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.applicationRef.isStable
      .pipe(
        filter(stable => stable),
        switchMap(() => this.swUpdate.available)
      )
      .subscribe(() => {
        const MODAL_REF = this.modal.open(UpdateAvailableComponent, {
          centered: true
        });
        MODAL_REF.result
          .then(() =>
            this.swUpdate.activateUpdate().then(() => location.reload())
          )
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          .catch(() => {});
      });
  }
}
