# data-to-code-api

###config file

{

  "apiPort":"3000",

  "dbServer": "172.19.16.69",

  "dbServerPort":"27017",

  "dbName":"dezvoltare",

  "dbUser":"{base 64}",

  "dbPass":"{base 64}",

  "uploadDirectory":"{some dir}",

  "secret": "c3VwZXJzZWNyZXQ=",

  "expiresIn": "86400"
}

dbUser dbPass

Sunt encodate base64.

Go to dir: **cd /direct_ory/direct_ory/project_name/node_modules/project_name/**

**Execute:** API_CONFIG=/direct_ory/{config-file}.json APP_LOG=/direct_ory/logs/ node ./node_modules/forever/bin/forever start -ae /direct_ory/logs/logs/drpciv-portal-admin-petitii-api.log index.js_

====================================================================

**`curl -X GET http://localhost:3000/api/api-ver`**