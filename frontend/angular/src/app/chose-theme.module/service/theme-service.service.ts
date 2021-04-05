import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {Themes} from '../class/themes';
import {Theme} from '../class/theme';

@Injectable()
export class ThemeService {
  themes: Themes = new Themes();
  theme: any;
  selectedTheme: any;
  private theme$: Subject<Theme>;

  constructor(private router: Router) {
    this.theme$ = (new Subject() as Subject<Theme>);

  }

  getThemes() {
    return this.themes.getThemes();
  }

  setTheme(theme: string) {
    if (theme === undefined || theme === null || theme === '') {
      theme = (theme === null || theme === undefined || theme === '' ? 'Black-Tie' : theme);
    }

    this.selectedTheme = theme;
    const d = document.getElementById('themeStyleSheet');
    if (d) {
      d.setAttribute('href', this.selectedTheme.path);
    }
    this.setNewTheme(this.selectedTheme);
  }

  setNewTheme(theme: Theme): void {
    this.theme$.next(theme);
  }

  getNewTheme(): Observable<Theme> {
    return this.theme$.asObservable();
  }

}
