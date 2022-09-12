/**
 * Estructura base en palabras:
 */
// Ubicación en el scaffolding.
// describe + it
// expect + matchers
// comandos -> npm run test: unit
//          -> npm run test:unit:watch <nombreDelArchivo>
//          -> npm run test:unit:watch <nombreDelArchivo>
// Estudiar estrutura y matchers.

/**
 * Estructura base en código:
 */
// describe('La cosa que vamos a testear', () => {
//     it('El comportamiento que esperamos de esa cosa', () => {
//         expect(unValor).toBe(otroValor)
//     });
// });


// it y test son métodos equivalentes
// describe -> puede tener otro describe adentro
//          -> puede tener uno o más it/test adentro














let a = 1;
let b = 1;

describe('La variable a', () => {
    it('Es igual a la variable b', () => {
        // let b = 2;
        expect(a).toBe(b);
        // expect(a).toEqual(b);
    });
});
