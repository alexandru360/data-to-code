import {SecurityConfiguration} from './common/classes/config';

export class AppConfigModel {
  constructor(public connTypes: Array<ConnTypesCfg>,
              public payloadConn: PayloadConn,
              public urls: Urls,
              public demoConn: Array<DemoConn>) {
  }
}

export class ConnTypesCfg {
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
  securityConfiguration: SecurityConfiguration;
  stepOneFindTables: string;
  stepTwoUrlToBeRenamed: string;
}

export class DemoConn extends PayloadConn {
  default: boolean;
}
