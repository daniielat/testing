const React = require('react');
const ProductList = require('..');
const { render, screen, fireEvent, act } = require('@testing-library/react');
const mockProductsProp = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MLA/search?limit=10&offset=0&q=celular.json');
const mockProductsRest = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MLA/search?limit=10&offset=10&q=celular.json')
const restclient = require('nordic/restclient');
require('core-js');

jest.mock('nordic/restclient', () => () => ({
    get: jest.fn((url, params) => {
        switch(params.params.offset) {
            case 10:
                return Promise.resolve({ data: mockProductsRest.data.results });
            case 20:
                return Promise.reject([]);
        }
    })
}));

describe('El componente ProductList', () => {
    let component;
    const i18n = { gettext: text => text };
    const setProductList = jest.fn();
    
    beforeEach(async() => {
        await act(async() => {
            component = render(<ProductList i18n={i18n} products={mockProductsProp.data.results} setProductList={setProductList}/>);
        });
    });

    it('Renderiza', () => {
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();
    });

    it('Trae los siguientes 10 productos al presionar el botón `Siguiente`', async() => {
        const button = screen.getByRole('button');
        await act(async() => {
            fireEvent.click(button);
        });
        expect(setProductList).toHaveBeenCalled();

        await act(async() => {
            fireEvent.click(button);
        });
        expect(setProductList.mock.calls[1][0]).toEqual([])
    });
});
