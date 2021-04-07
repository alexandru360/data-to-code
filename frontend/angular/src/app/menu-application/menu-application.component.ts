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
              label: 'Application',
              items: [
                {
                  label: 'Create new application', routerLink: 'new-app-template-selection', routerLinkActiveOptions: true,
                },
                {
                  label: 'Demo component...', routerLink: 'demo', routerLinkActiveOptions: true,
                }
              ]
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
