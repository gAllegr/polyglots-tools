import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Changelog } from './changelog.model';

/**
 * Changelog page of the application.
 */
@Component({
  selector: 'app-changelog',
  styleUrls: ['./changelog.component.scss'],
  templateUrl: './changelog.component.html'
})
export class ChangelogComponent {
  public changelog$: Observable<Changelog[]>;

  constructor(private readonly http: HttpClient) {
    const changelogPath = '/assets/json/changelog.json';
    this.changelog$ = this.http.get<Changelog[]>(changelogPath).pipe(
      map(changelog => this.orderChangelog(changelog)),
      catchError(() => of([] as Changelog[]))
    );
  }

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
