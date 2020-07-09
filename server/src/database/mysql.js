const aws = require('../../aws');

var connection = require('knex')({
    client: 'mysql',
    connection: async () => {

      const result = await aws.mySecrets('lrpa_bi');

      console.log('resultado do met aws ' + result);

      var parsed = JSON.parse(result);
      console.log(parsed.username);
      console.log(parsed.password);

      return {
        // host : 'rpa-dev1',
        host : 'rpa-uat1',
        // host : 'rpa-prd1',
        user : parsed.username,
        password : parsed.password,
        database : 'RPA_BI'
        // expirationChecker: () => {
        //   return tokenExpiration <= Date.now();
        // }
      };

    }

  });

  module.exports = connection;
