const axios = require('axios');

class RestClient {
    constructor(config) {
        this.baseURL = config.baseURL || 'https://internal-api.mercadolibre.com';
        this.timeout = config.timeout || 3000;
    }

    get(path) {
        return axios.get(path, {
            timeout: this.timeout,
            baseURL: this.baseURL
        });
    }
}

const InitializeRestClient = (config) => new RestClient(config);

module.exports = InitializeRestClient;
