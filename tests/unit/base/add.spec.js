const add = require('../../../app/helpers/base/add');

// Descripción de la cosa que vamos a testear
describe('La función add', () => {
    // Test unitario del comportamiento de la cosa
    it('Devuelve la suma de los dos parámetros que recibe', () => {
        // Le ejecución de la cosa
        let result = add(2, 2);
        // El testeo de la ejecución de la cosa mediante una aserción 
        expect(result).toBe(4);
    });
});
