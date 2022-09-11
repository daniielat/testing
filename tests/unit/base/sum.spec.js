const sum = require('../../../app/helpers/sum');

// La cosa que vamos a testear
describe('La función sum', () => {
    // El comportamiento de la cosa
    it('Devuelve la suma de los dos parámetros que recibe', () => {
        let result = sum(2, 2);
        expect(result).toBe(4);
    });
});
