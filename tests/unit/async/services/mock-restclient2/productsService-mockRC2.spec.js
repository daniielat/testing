const productsService = require('../../../../../services/ProductsService');
const restclient = require('nordic/restclient');
const mockProducts = require('../../../../../mocks/test/get/https/api.mercadolibre.com/sites/MLA/search?limit=10&offset=0&q=celular.json');
const mockError = require('../../../../../mocks/test/get/https/api.mercadolibre.com/sites/MLA/search?limit=a&offset=0.json');

jest.mock('nordic/restclient');
const { mockGet } = restclient;

describe('testService', () => {
    it('Responde con un array de productos cuando recibe una respuesta exitosa', () => {
        mockGet.mockImplementationOnce(() => Promise.resolve(mockProducts));
        return productsService.getProducts('MLA', 'celular', 10, 0)
            .then(products => {
                expect(products).toBeInstanceOf(Array);
                expect(products[0].id).toBe('MLA1149779661');
            });
    });

    xit('Responde con un array vacío cuando recibe un error como respuesta', async() => {
        mockGet.mockImplementationOnce(() => Promise.reject(mockError));
        return productsService.getProducts('MLA', null, 'a', 0)
            .then(value => console.log(value));
    });

    xit('Arroja un error cuando falla la llamada', async() => {
        mockGet.mockImplementationOnce(() => Promise.reject(mockError));
        return productsService.getProducts('MLA', null, 'a', 0)
            .then(value => console.log(value))
            .catch(error => {
                expect(error).toBeInstanceOf(Error);
            });
    });
});

