import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Changelog } from '../../shared/models/changelog.model';

/**
 * Changelog page of the application.
 */
@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html'
})
export class ChangelogComponent {
  public changelog$: Observable<Changelog[]>;

  constructor(private readonly http: HttpClient) {
    const CHANGELOG_PATH = '/assets/json/changelog.json';
    this.changelog$ = this.http.get<Changelog[]>(CHANGELOG_PATH).pipe(
      map(changelog => this.orderChangelog(changelog)),
      catchError(() => of([] as Changelog[]))
    );
  }

  /**
   * Given the changelog item, for each version the commit list is reverted to display the oldest commits first.
   *
   * @param changelog The changelog object.
   * @returns {Changelog[]} The changelog ordered.
   */
  private orderChangelog(changelog: Changelog[]): Changelog[] {
    let orderedChangelog: Changelog[] = [];

    changelog.forEach(changelogItem => {
      orderedChangelog = [
        ...orderedChangelog,
        {
          comments: changelogItem.comments.reverse(),
          version: changelogItem.version
        }
      ];
    });

    return orderedChangelog;
  }
}
