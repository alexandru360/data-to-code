// https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md
const PROXY_CONFIG = [
  {
    context: [
      "/data2code",
    ],
    target: "https://www.data-to-code.eu/",
    secure: true,
    logLevel: 'debug', //Possible options for logLevel include debug, info, warn, error, and silent (default is info)
    ws: true
  }
];

module.exports = PROXY_CONFIG;
