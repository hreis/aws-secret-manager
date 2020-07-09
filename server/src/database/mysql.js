const aws = require('../../aws');

var connection = require('knex')({
    client: 'mysql',
    connection: async () => {

      const result = await aws.mySecrets('');

      console.log('resultado do met aws ' + result);

      var parsed = JSON.parse(result);
      console.log(parsed.username);
      console.log(parsed.password);

      return {
        // host : '',
        host : '',
        // host : '',
        user : parsed.username,
        password : parsed.password,
        database : ''
        // expirationChecker: () => {
        //   return tokenExpiration <= Date.now();
        // }
      };

    }

  });

  module.exports = connection;
