import EntitiesDetails from './entities-details';

export default class StepOneResponse {
  success: boolean;
  error: any;
  input: Array<EntitiesDetails>;

  constructor() {
    this.input = new Array<EntitiesDetails>();
  }
}
