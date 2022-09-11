const { invokeCallback, invokeCallbackWithArgs } = require('../../../app/helpers/callbackFunctions');

describe('La función invokeCallback', () => {
    it('Invoca la función que recibe por parámetro', () => {
        const cb = jest.fn();
        const value = invokeCallback(cb);
        // console.log(cb.mock);
        expect(cb).toHaveBeenCalled();
    });
});

describe('La función invokeCallbackWithArgs', () => {
    it('Invoca el callback con el primer argumento que recibe', () => {
        const cb = jest.fn();
        const value = invokeCallbackWithArgs([1, 2, 3], cb);
        const value2 = invokeCallbackWithArgs('Hello!', cb);
        console.log(cb.mock);
        expect(cb).toHaveBeenCalledWith([1, 2, 3]);
        expect(cb).toHaveBeenCalledWith('Hello!');   
    });
});
