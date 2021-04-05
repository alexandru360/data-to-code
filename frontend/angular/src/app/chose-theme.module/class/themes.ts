import {Theme} from './theme';

export class Themes {
  themes: Theme[];

  constructor() {
    this.themes = this.getThemes();
  }

  getThemes(): Theme[] {
    const themeArray: Theme[] = [];
    const basePath = 'assets/themes/resources/themes/';
    const endPath = '/theme.css';

    themeArray.push(new Theme('Bstrap Light Blue', basePath + 'bootstrap4-light-blue' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Bstrap Light Purple', basePath + 'bootstrap4-light-purple' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Bstrap Dark Blue', basePath + 'bootstrap4-dark-blue' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Bstrap Dark Purple', basePath + 'bootstrap4-dark-purple' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Light Indigo', basePath + 'md-light-indigo' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Light Deeppurple', basePath + 'md-light-deeppurple' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Dark Indigo', basePath + 'md-dark-indigo' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Dark Deeppurple', basePath + 'md-dark-deeppurple' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Light Indigo', basePath + 'mdc-light-indigo' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Light Deeppurple', basePath + 'mdc-light-deeppurple' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Dark Indigo', basePath + 'mdc-dark-indigo' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Dark Deeppurple', basePath + 'mdc-dark-deeppurple' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Fluent Light', basePath + 'fluent-light' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Saga Blue', basePath + 'saga-blue' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Saga Green', basePath + 'saga-green' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Saga Orange', basePath + 'saga-orange' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Saga Purple', basePath + 'saga-purple' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Vela Blue', basePath + 'vela-blue' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Vela Green', basePath + 'vela-green' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Vela Orange', basePath + 'vela-orange' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Vela Purple', basePath + 'vela-purple' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Arya Blue', basePath + 'arya-blue' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Arya Green', basePath + 'arya-green' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Arya Orange', basePath + 'arya-orange' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Arya Purple', basePath + 'arya-purple' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Nova', basePath + 'nova' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Nova Alt', basePath + 'nova-alt' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Nova Accent', basePath + 'nova-accent' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Luna Amber', basePath + 'luna-amber' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Luna Blue', basePath + 'luna-blue' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Luna Green', basePath + 'luna-green' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Luna Pink', basePath + 'luna-pink' + endPath, '#dddddd', '#eeeeee', 'light'));
    themeArray.push(new Theme('Rhea', basePath + 'rhea' + endPath, '#dddddd', '#eeeeee', 'light'));

    return themeArray;
  }
}
