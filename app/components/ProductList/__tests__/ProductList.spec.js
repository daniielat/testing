const React = require('react');
const ProductList = require('..');
const { render, screen, fireEvent } = require('@testing-library/react');
const mockProducts = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MLA/search?limit=10&offset=0&q=celular.json');

describe('El componente Pagination', () => {
    let component;
    const i18n = { gettext: text => text };
    const setProductList = jest.fn();
    
    beforeEach(() => {
        component = render(<ProductList i18n={i18n} products={mockProducts.data.data} setProductList={setProductList}/>);
    });

    it('Renderiza', () => {
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();
    });

    // it('Aumenta el valor de offser al clickear el botón `Siguiente`', () => {
    //     const button = screen.getByRole('button');
    //     fireEvent.click(button);

    //     expect(offset).toEqual(10);
    // });
});