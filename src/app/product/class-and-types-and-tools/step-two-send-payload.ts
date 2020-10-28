import {PayloadConn} from '../../app.config.model';
import CrudEndpoints from './crud-endpoints';
import {OutputToGenerateItem} from '../../common/classes/outputToGenerate';

export default class StepTwoSendPayload {
  payloadConn: PayloadConn;
  input: Array<Input>;
  output: Array<OutputToGenerateItem>;

  constructor() {
    this.payloadConn = new PayloadConn();
    this.input = new Array<Input>();
    this.output = new Array<OutputToGenerateItem>();
  }
}

export class Input {
  table: Table;
  crudEndpoints: CrudEndpoints;
}

export class Table {
  name: string;
  fields: Field[];
}

export class Field {
  name: string;
  type: string;
}
