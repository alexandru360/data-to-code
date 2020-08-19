import EntityField from './entity-field';

export default class EntitiesDetails {
  name: string;
  fields: Array<EntityField>;

  constructor() {
    this.fields = new Array<EntityField>();
  }
}
