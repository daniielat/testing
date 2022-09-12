// const restclient = require('../../../app/helpers/restclient'); // es opcional
const productsService = require('../../../app/helpers/jest-mocks/service');

jest.mock('../../../app/helpers/jest-mocks/restclient', () => () => ({
    get: jest.fn(() => Promise.resolve({ data: {
        results: [
            { 
                id: 'MLA1294249243',
                title: 'Samsung Galaxy S749'
            }
        ]
    }}))
}));

describe('El servicio ProductsService', () => {
    describe('El método getProducts', () => {
        it('Retorna un array de productos de la API interna', async() => {
            const product = await productsService.getProducts('MLA', 'celular');
            expect(product[0].id).toBe('MLA1294249243');
            expect(product[0].title).toMatch(/samsung galaxy/i);
        });
    });
});
