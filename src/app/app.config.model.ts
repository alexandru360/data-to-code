export class AppConfigModel {
  constructor(public connTypes: Array<ConfigConnTypes>,
              public payloadConn: PayloadConn,
              public urls: Urls) {
  }
}

export class ConfigConnTypes {
  name: string;
  connType: string;
}

export class PayloadConn {
  connType: string;
  connFileName: string;
  connFileContent: string | ArrayBuffer;
  connHost: string;
  connPort: string;
  connUser: string;
  connPassword: string;
  connDatabase: string;
}

export class Urls {
  apiRootUrl: string;
  stepOneFindTables: string;
  stepTwoUrlToBeRenamed: string;
}
