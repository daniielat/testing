const restclient = require('nordic/restclient')({
    timeout: 10000,
    baseURL: 'https://api.mercadolibre.com'
})

class ProductsService {
    static getProducts(siteId, q, limit, offset) {
        return restclient.get(`/sites/${siteId}/search?`, {
            params: {
                q, 
                limit,
                offset
            }
        })
            .then(response => {
                return response.data.results;
            })
            .catch(error => {
                throw new Error(error);
                // throw error
                // return [];
            });
    }
}

module.exports = ProductsService;
