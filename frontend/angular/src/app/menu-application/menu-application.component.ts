import {Component, isDevMode, OnInit} from '@angular/core';
import {Theme} from '../chose-theme.module/class/theme';
import {ThemeService} from '../chose-theme.module/service/theme-service.service';
import {MegaMenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu-application',
  templateUrl: './menu-application.component.html',
  styleUrls: ['./menu-application.component.css']
})
export class MenuApplicationComponent implements OnInit {
  items: MegaMenuItem[];
  themeList: Theme[] = [];
  selectedTheme: any;

  constructor(private themeService: ThemeService) {
    this.themeList = this.themeService.themes.themes;
    this.items = [];
  }

  ngOnInit(): void {
    this.setDefaultTheme();
    this.items = [
      {
        label: 'Modules', icon: 'pi pi-fw pi-angle-double-right',
        items: [
          [
            {
              label: 'Contabilitate',
              items: [{label: 'Modul 1.1', routerLink: 'demo', routerLinkActiveOptions: true, }, {label: 'Modul 1.2'}]
            },
            {
              label: 'Gestiune',
              items: [{label: 'Modul 2.1'}, {label: 'Modul 2.2'}]
            }
          ],
          [
            {
              label: 'Salarii',
              items: [{label: 'Modul 3.1'}, {label: 'Modul 3.2'}]
            },
            {
              label: 'Altele',
              items: [{label: 'Modul 4.1'}, {label: 'Modul 4.2'}]
            }
          ]
        ]
      },
      {
        label: 'Users', icon: 'pi pi-fw pi-users',
        items: [
          [
            {
              label: 'User 1',
              items: [{label: 'User 1.1'}, {label: 'User 1.2'}]
            },
            {
              label: 'User 2',
              items: [{label: 'User 2.1'}, {label: 'User 2.2'}]
            },
          ],
          [
            {
              label: 'User 3',
              items: [{label: 'User 3.1'}, {label: 'User 3.2'}]
            },
            {
              label: 'User 4',
              items: [{label: 'User 4.1'}, {label: 'User 4.2'}]
            }
          ],
          [
            {
              label: 'User 5',
              items: [{label: 'User 5.1'}, {label: 'User 5.2'}]
            },
            {
              label: 'User 6',
              items: [{label: 'User 6.1'}, {label: 'User 6.2'}]
            }
          ]
        ]
      },
      {
        label: 'Events', icon: 'pi pi-fw pi-calendar',
        items: [
          [
            {
              label: 'Event 1',
              items: [{label: 'Event 1.1'}, {label: 'Event 1.2'}]
            },
            {
              label: 'Event 2',
              items: [{label: 'Event 2.1'}, {label: 'Event 2.2'}]
            }
          ],
          [
            {
              label: 'Event 3',
              items: [{label: 'Event 3.1'}, {label: 'Event 3.2'}]
            },
            {
              label: 'Event 4',
              items: [{label: 'Event 4.1'}, {label: 'Event 4.2'}]
            }
          ]
        ]
      },
      {
        label: 'Settings', icon: 'pi pi-fw pi-cog',
        items: [
          [
            {
              label: 'Setting 1',
              items: [{label: 'Setting 1.1'}, {label: 'Setting 1.2'}]
            },
            {
              label: 'Setting 2',
              items: [{label: 'Setting 2.1'}, {label: 'Setting 2.2'}]
            },
            {
              label: 'Setting 3',
              items: [{label: 'Setting 3.1'}, {label: 'Setting 3.2'}]
            }
          ],
          [
            {
              label: 'Technology 4',
              items: [{label: 'Setting 4.1'}, {label: 'Setting 4.2'}]
            }
          ]
        ]
      }
    ];
  }

  onThemeSelect(par: any): void {
    this.selectedTheme = par.value;
    if (isDevMode()) {
      console.log('onThemeSelect - par', par);
      console.log('onThemeSelect - par.value', par.value);
    }
    this.setTheme();
  }

  setTheme(): void {
    this.themeService.setTheme(this.selectedTheme);
  }

  setDefaultTheme(): void {
    const defaTheme = this.themeList.find(f => f.name === 'Bstrap Dark Blue');
    this.selectedTheme = defaTheme;
    this.setTheme();
  }
}
