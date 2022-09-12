const restclient = require('./restclient')({
    timeout: 5000,
    baseURL: 'https://api.mercadolibre.com'
});

class ProductsService {
    static getProducts(siteId, q) {
        return restclient.get(`/sites/${siteId}/search?q=${q}`)
            .then(response => response.data.results)
            .catch(err => console.log(err));
    }
}

module.exports = ProductsService;
