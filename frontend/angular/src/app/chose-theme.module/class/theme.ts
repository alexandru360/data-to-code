export class Theme {
  name: string;
  path: string;
  contentBorderColor: string;
  contentBackgroundColor: string;
  themeType: string;

  constructor(name: string, path: string,
              contentBorderColor: string,
              contentBackgroundColor: string,
              themeType: string) {
    this.name = name;
    this.path = path;
    this.contentBorderColor = contentBorderColor;
    this.contentBackgroundColor = contentBackgroundColor;
    this.themeType = themeType;
  }
}

