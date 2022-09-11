const React = require('react');
const View = require('../view');
const { render, screen, fireEvent, act } = require('@testing-library/react');
const mockProductsProp = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MLA/search?limit=10&offset=0&q=celular.json');
const restclient = require('nordic/restclient');
require('core-js');

jest.mock('nordic/restclient', () => () => ({
    get: jest.fn((url, params) => {
        switch(params.params.offset) {
            case 10:
                return Promise.reject([]);
        }
    })
}));

describe('El componente ProductList', () => {
    let component;
    const i18n = { gettext: text => text };
    
    beforeEach(async() => {
        await act(async() => {
            component = render(<View i18n={i18n} products={mockProductsProp.data.results} />);
        });
    });

    it('Muestra un mensaje de error cuando no se encuentran productos (componente ProductList)', async() => {
        const button = screen.getByRole('button');
        await act(async() => {
            fireEvent.click(button);
        });
        const message = await screen.findByText(/no se encontraron productos/i);
        screen.debug(errorMsg);
    });
});
