const { fetchProducts } = require('../../../../../app/pages/products/controller');
const httpMocks = require('node-mocks-http');
const mockProducts = require('../../../../../mocks/test/get/https/api.mercadolibre.com/sites/MLA/search?limit=10&offset=0&q=celular.json');
const mockError = require('../../../../../mocks/test/get/https/api.mercadolibre.com/sites/MLA/search?limit=a&offset=0.json');
const restclient = require('nordic/restclient');

const { mockGet } = restclient;

// En este archivo falta poder testear el res.redirect dentro del 
// catch cuando el middleware no es una función async, y poder 
// hacerlo con done.
describe('fetchProducts middleware', () => {

    // Llamada exitosa con done() 
    it('Guarda un array de productos en res.locals.products', (done) => {
        mockGet.mockImplementationOnce(() => Promise.resolve(mockProducts));
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/products',
            platform: {
                siteId: 'MLA'
            },
            query: {
                q: 'celular',
                limit: 10,
            }
        });
        const res = httpMocks.createResponse();

        fetchProducts(req, res, () => {
            expect(res.locals.products).toBeInstanceOf(Array);
            done();
        });
    });

      // Llamada fallida que invoca next(error), hecha con done()
      it('Invoca next con el error enviado por el servicio cuando falla', (done) => {
        mockGet.mockImplementationOnce(() => Promise.reject(mockError));
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/products',
            platform: {
                siteId: 'MLA'
            },
            query: {
                limit: 'a'
            }
        });
        const res = httpMocks.createResponse();
        fetchProducts(req, res, (error) => {
            expect(error).toBeInstanceOf(Error);
            done();
        });
    });

    // Llamada exitosa con async/await
    it('Guarda un array de productos en res.locals.products', async() => {
        mockGet.mockImplementationOnce(() => Promise.resolve(mockProducts));
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/products',
            platform: {
                siteId: 'MLA'
            },
            query: {
                q: 'celular',
                limit: 10,
            }
        });
        const res = httpMocks.createResponse();
        try {
            await fetchProducts(req, res, () => {
                expect(res.locals.products).toBeInstanceOf(Array);
            });
        } catch(err) {
            console.log(err);
        }
    });

    // Llamada fallida que invoca next(error), hecha con async/await
    it('Invoca next con el error enviado por el servicio cuando falla', async() => {
        mockGet.mockImplementationOnce(() => Promise.reject(mockError));
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/products',
            platform: {
                siteId: 'MLA'
            },
            query: {
                limit: 'a'
            }
        });
        const res = httpMocks.createResponse();
        res.redirect = jest.fn();
        try {
            await fetchProducts(req, res, (error) => {
                expect(error).toBeInstanceOf(Error);
            });
        } catch(err) {
            console.log(err);
        }
    });

    // Llamada fallida que invoca res.redirect(), hecha con async/await
    xit('Redirije a la página de error cuando la llamada a la API falla', async() => {
        mockGet.mockImplementationOnce(() => Promise.reject(mockError));
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/products',
            platform: {
                siteId: 'MLA'
            },
            query: {
                limit: 'a'
            }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();
        res.redirect = jest.fn();
        try {
            await fetchProducts(req, res, next);
            // console.log(res.redirect.mock.calls[0])
            expect(res.redirect).toHaveBeenCalledWith('/error');
        } catch(err) {
            console.log(err);
        }
    });
});