module.exports = {
    async mySecrets(secretName) {
        // Load the AWS SDK
        var AWS = require('aws-sdk'),
            region = "sa-east-1",
            secretName = secretName,
            secret,
            decodedBinarySecret;

        // Create a Secrets Manager client
        var client = new AWS.SecretsManager({
            region: region
        });

        return new Promise((resolve, reject) => {

            client.getSecretValue({ SecretId: secretName }, function (err, data) {

                console.log('entrou no metodo ASYNC AWS');
                console.log(secretName)

                if (err) {
                    reject(err);
                }
                else {
                    if ('SecretString' in data) {
                        secret = data.SecretString;
                        resolve(secret);
                    } else {
                        let buff = new Buffer(data.SecretBinary, 'base64');
                        resolve(buff.toString('ascii'));
                    }
                }
                console.log('NAO DEU ERRO')
                console.log(`secret - ${secret}`);

                var connection = JSON.parse(secret);

                var settings = {
                    user: connection.username,
                    password: connection.password,
                }

                resolve(settings);

            });

        });
    }
}