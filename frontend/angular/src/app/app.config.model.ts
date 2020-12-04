import {SecurityConfig} from './common/classes/config';

export class AppConfigModel {
  constructor(public connTypes: Array<KeyValueCfg>,
              public generateTypes: GenerateTypes,
              public payloadConn: PayloadConn,
              public securityConfig: SecurityConfig,
              public urls: Urls,
              public demoConn: Array<DemoConn>
  ) {
  }
}

export class KeyValueCfg {
  Key: string;
  Name: string;
  Message: string;
}

export class GenerateTypes {
  Api: Array<KeyValueCfg>;
  Ui: Array<KeyValueCfg>;

  constructor() {
    this.Api = new Array<KeyValueCfg>();
    this.Ui = new Array<KeyValueCfg>();
  }
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
  connIntegratedSecurity: boolean;
}

export class Urls {
  apiRootUrl: string;
  stepOneFindTables: string;
  stepTwoUrlToBeRenamed: string;
  versionUrl: string;
  
}

export class DemoConn extends PayloadConn {
  default: boolean;
}
