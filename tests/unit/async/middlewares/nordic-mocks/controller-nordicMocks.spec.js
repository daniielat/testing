const { fetchProducts } = require('../../../../../app/pages/products/controller');
const httpMocks = require('node-mocks-http');
const mock = require('nordic-dev/mocks')();
const apiDomain = 'https://api.mercadolibre.com';

describe('fethProducts middleware', () => {
    beforeAll(() => {
        mock.intercept(apiDomain, ['/sites/*'])
    });

    afterAll(() => {
        mock.restore(apiDomain, ['/sites/*']);
    });

    it('Guarda un array de productos en res.locals.products', (done) => {
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

    xit('Invoca next con el error enviado por el servicio cuando falla', (done) => {
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

    it('Redirije a la página de error cuando el servicio falla', (done) => {
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
        fetchProducts(req, res);
        done();
    })
})