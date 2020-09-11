import {PayloadConn} from '../../app.configuration';
import CrudEndpoints from './crud-endpoints';

export default class StepTwoSendPayload{
  payloadConn: PayloadConn;
  input: Input[];
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
