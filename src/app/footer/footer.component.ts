import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Footer of the application. Display the version and a link to the changelog page.
 */
@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  public readonly formattedVersion: string;

  constructor() {
    this.formattedVersion = this.getVersion();
  }

  /**
   * Construct the version to be displayed in the footer.
   */
  private getVersion(): string {
    const SPLITTED_DATA = environment.app_version.split('-');
    const VERSION_INDEX = 0;
    const VERSION = SPLITTED_DATA[VERSION_INDEX];
    const BUILD_NUMBER_INDEX = 1;
    const BUILD_NUMBER = SPLITTED_DATA[BUILD_NUMBER_INDEX];
    const ENVIRONMENT_TYPE = environment.production ? '' : ` - stage`;

    return `${VERSION} (${BUILD_NUMBER})${ENVIRONMENT_TYPE}`;
  }
}
