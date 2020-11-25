export class SecurityConfig {
  constructor(
    public useSecurity: boolean,
    public defaultAuthenticatedRoute: string,
    public loginRoute: string,
    public registerRoute: string,
    public recoverPasswordRoute: string,
    public userStatsLogins: string,
    public userStatsOtherMetrics: string
  ) {
  }
}
