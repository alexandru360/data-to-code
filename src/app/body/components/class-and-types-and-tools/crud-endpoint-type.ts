export default class CrudEndpointType {
  Connection: string;
  Type: string; // Actually is an enum based on what the guy chooses and sets the connection to be ...
  SqlStatement: string;

  constructor() {
    this.Connection = 'conn';
    this.Type = 'type';
    this.SqlStatement = 'sqlStatement';
  }

  getReadSql(fields: Array<string>, tableName: string): string {
    return `Select ${fields.join(', ')} from ${tableName}`;
  }

  getCreateSql(fields: Array<string>, tableName: string): string {
    const flds = fields.map((itm, idx) => `${itm} = ${idx}`);
    return `Insert into ${tableName} ()` + flds + `) values (some values ...)`;
  }

  getUpdateSql(fields: Array<string>, tableName: string): string {
    const flds = fields.map((itm, idx) => `${itm} = ${idx}`);
    return `Update ${tableName} Set ` + flds + `Where something`;
  }

  getDeleteSql(fields: Array<string>, tableName: string): string {
    return `delete from ${tableName} where some id equals something`;
  }
}
