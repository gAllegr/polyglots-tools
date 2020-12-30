import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Footer of the application.
 * Display the version of the application and a link to the changelog page.
 */
@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  public readonly formattedVersion: string;

  constructor() {
    this.formattedVersion = this.getVersion(environment.app_version);
  }

  private getVersion(versionFromPackageJson: string) {
    const splittedVersionData = versionFromPackageJson.split('-');
    const version = splittedVersionData[0];
    const buildNumber = splittedVersionData[1];
    const environmentType = environment.production ? '' : ` - stage`;

    return `${version} (${buildNumber})${environmentType}`;
  }
}
