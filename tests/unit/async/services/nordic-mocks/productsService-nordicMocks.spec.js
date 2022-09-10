const productsService = require('../../../../../services/productsService');
const mock = require('nordic-dev/mocks')();
const apiDomain = 'https://api.mercadolibre.com';

describe('productsService', () => {
    beforeAll(() => {
        mock.intercept(apiDomain, ['/sites/*']);
    });

    afterAll(() => {
        mock.restore(apiDomain, ['/sites/*']);
    });

    // Promesas normales
    it('Responde con un array de productos cuando recibe los parámetros necesarios', () => {
        return productsService.getProducts('MLA', 'celular', 10, 0)
            .then(products => {
                expect(products).toBeInstanceOf(Array);
                expect(products[0].id).toBe('MLA1149779661');
            });
    });

    it('Responde con un array vacío cuando ocurre un error en la llamada', () => {
        return productsService.getProducts('MLA', null, 'a', 0)
            .catch(err => {
                expect(err).toBeInstanceOf(Error);
            });
    });

    // async/await
    it('Responde con un array de productos cuando recibe los parámetros necesarios', async() => {
        const products = await productsService.getProducts('MLA', 'celular', 10, 0)
        expect(products).toBeInstanceOf(Array);
        expect(products[0].id).toBe('MLA1149779661');
    });

    it('Responde con un array vacío cuando ocurre un error en la llamada', async() => {
        try {
            await productsService.getProducts('MLA', null, 'a', 0)
        } catch(err) {
            expect(err).toBeInstanceOf(Error);
        }
    });
});
