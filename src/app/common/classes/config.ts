export class SecurityConfiguration {
  constructor(
    public LoginRoute: string,
    public RegisterRoute: string,
    public RecoverPasswordRoute: string,
    public UserStatsLogins: string,
    public UserStatsOtherMetrics: string
  ) {
  }
}
