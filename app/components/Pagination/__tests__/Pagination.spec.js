const React = require('react');
const Pagination = require('..');
const { render, screen, fireEvent } = require('@testing-library/react');

describe('El componente Pagination', () => {
    let component;
    const i18n = { gettext: text => text };
    const setOffset = jest.fn((offset) => offset = offset + 10)
    
    beforeEach(() => {
        component = render(<Pagination i18n={i18n} offset={0} setOffset={setOffset}/>);
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