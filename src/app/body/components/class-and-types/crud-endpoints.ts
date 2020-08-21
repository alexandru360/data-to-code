import CrudEndpointType from './crud-endpoint-type';

export default class CrudEndpoints {
  Read: CrudEndpointType;
  Create: CrudEndpointType;
  Update: CrudEndpointType;
  Delete: CrudEndpointType;

  constructor() {
    this.Read = new CrudEndpointType();
    this.Create = new CrudEndpointType();
    this.Update = new CrudEndpointType();
    this.Delete = new CrudEndpointType();

    // this.setDefault();
  }

  setDefault() {
    this.Read.SqlStatement = this.Read.getReadSql([], '');
    this.Create.SqlStatement = this.Create.getCreateSql([], '');
    this.Update.SqlStatement = this.Update.getUpdateSql([], '');
    this.Delete.SqlStatement = this.Delete.getDeleteSql([], '');
  }
}
