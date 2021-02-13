import { Component, Input, OnInit } from '@angular/core';
import { CommentType } from '../changelog.model';

/**
 * Renderize the badges on the changelog.
 */
@Component({
  selector: 'app-badge',
  styleUrls: ['./badge.component.scss'],
  templateUrl: './badge.component.html'
})
export class BadgeComponent implements OnInit {
  public color = '';
  @Input() public text: CommentType | undefined;

  // eslint-disable-next-line jsdoc/require-jsdoc
  public ngOnInit(): void {
    this.setColorBasedOnProvidedText();
  }

  /**
   * Set the appropriate color for the changelog line's badge, based on the changelog type.
   *
   * @returns {void} Nothing.
   */
  private setColorBasedOnProvidedText(): void {
    switch (this.text) {
      case 'FEATURE':
        this.color = 'badge-success';
        break;
      case 'BUGFIX':
        this.color = 'badge-danger';
        break;
      case 'CONFIG':
        this.color = 'badge-secondary';
        break;
      case 'QUALITY':
        this.color = 'badge-info';
        break;
      default:
        this.color = '';
    }
  }
}
