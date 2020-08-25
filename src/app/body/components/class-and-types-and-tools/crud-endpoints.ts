
export default class CrudEndpoints {
  List: boolean;
  Create: boolean;
  Update: boolean;
  Delete: boolean;
  Upsert: boolean;

  constructor() {
    this.List = true;
    this.Create = true;
    this.Update = true;
    this.Delete = true;
    this.Upsert = true;
  }
}
