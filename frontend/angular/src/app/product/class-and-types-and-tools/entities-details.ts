import EntityField from './entity-field';
import CrudEndpoints from './crud-endpoints';

export default class EntitiesDetails {
  name: string;
  fields: Array<EntityField>;
  selected: boolean;
  crudEndpoints: CrudEndpoints;
  display:boolean;
  constructor() {
    this.fields = new Array<EntityField>();
    this.crudEndpoints = new CrudEndpoints();
  }
}
