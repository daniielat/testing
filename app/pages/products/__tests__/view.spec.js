const React = require('react');
const View = require('../view');
const { render, screen } = require('@testing-library/react');
const mockProducts = require('../../../../mocks/test/get/https/api.mercadolibre.com/sites/MLA/search?limit=10&offset=0&q=celular.json');

describe('La View de Products', () => {
    let component;
    const i18n = { gettext: text => text };
    
    it('Renderiza', () => {
        component = render(<View i18n={i18n} products={mockProducts.data.data}/>)
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();
    });

    it('Renderiza un mensaje de error si no se encontraron productos', () => {
        component = render(<View i18n={i18n} products={[]}/>);
        const message = screen.getByText(/no se encontraron productos/i);
        expect(message).toBeInTheDocument();
    });
});
