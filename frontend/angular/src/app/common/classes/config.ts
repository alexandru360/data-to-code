export class Configuration {
  public LoginRoute = '';
  public RegisterRoute = '';
  public RecoverPasswordRoute = '';
  public ChatHubRoute = '';
  public AddTrip = '';
  public GetUserTrips: string;

  constructor() {
    this.LoginRoute = '';
    this.RegisterRoute = '';
    this.RecoverPasswordRoute = '';
    this.ChatHubRoute = '';
    this.AddTrip = '';
    this.GetUserTrips = '';
  }
}
