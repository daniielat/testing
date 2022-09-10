const productsService = require('../../../../../services/ProductsService');
const mockProducts = require('../../../../../mocks/test/get/https/api.mercadolibre.com/sites/MLA/search?limit=10&q=celular.json');
const mockError = require('../../../../../mocks/test/get/https/api.mercadolibre.com/sites/MLA/search?limit=a.json');
// const mockProducts = require('./products.json');

jest.mock('nordic/restclient', () => () => ({
    get: jest.fn((url, params) => {
        switch (params.params.limit) {
            case 10:
                return Promise.resolve(mockProducts);
            case 'a':
                return Promise.reject(mockError);
            case 'b': 
                return Promise.reject(mockError)
        }
    })
}));

// Promesas normales
describe('productsService', () => {
    it('Responde con un array de productos cuando recibe los parámetros necesarios', () => {
        return productsService.getProducts('MLA', 'celular', 10)
            .then(products => {
                expect(products).toBeInstanceOf(Array);
                expect(products[0].id).toBe('MLA1127183167');
            });
    });

    xit('Responde con un array vacío si ocurre un error', () => {
        return productsService.getProducts('MLA', null, 'a')
            .then(value => {
                expect(value).toEqual([]);
            });
    });

    it('Arroja un error si falla la llamada', () => {
        return expect(productsService.getProducts('MLA', null, 'a')).rejects.toThrow();
        // return productsService.getProducts('MLA', null, 'a')
        //     .catch(value => {
        //         expect(value).toBeInstanceOf(Error);
        //     });
    });
});

// async/await
describe('productsService async/await', () => {
    it('Responde con un array de productos cuando recibe los parámetros necesarios', async() => {
        const products = await productsService.getProducts('MLA', 'celular', 10);
        expect(products).toBeInstanceOf(Array);
        expect(products[0].id).toBe('MLA1127183167');
    });

    xit('Responde con un array vacío si ocurre un error', async() => {
        try {
            const value = await productsService.getProducts('MLA', null, 'b');
            expect(value).toEqual([]);
        } catch(err) {
            console.log(err);
        }
    });
    
    xit('Arroja un error si falla la llamada', async() => {
        await expect(productsService.getProducts('MLA', null, 'b')).rejects.toThrow();
        // try {
        //     await productsService.getProducts('MLA', null, 'b');
        // } catch(err) {
            // expect(err).toBeInstanceOf(Error);
            // expect(err.status).toBe(400);
            // expect(err).toHaveProperty('message');
        // }
    });
})
