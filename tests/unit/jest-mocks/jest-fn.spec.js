const { invokeCallback, invokeCallbackWithArgs, forEach } = require('../../../app/helpers/callbackFunctions');

describe('La función invokeCallback', () => {
    it('Invoca la función que recibe por parámetro', () => {
        const cb = jest.fn();
        invokeCallback(cb);
        // console.log(cb.mock);
        expect(cb).toHaveBeenCalled();
    });
});

describe('La función invokeCallbackWithArgs', () => {
    it('Invoca el callback con el primer argumento que recibe', () => {
        const cb = jest.fn();
        invokeCallbackWithArgs([1, 2, 3], cb);
        invokeCallbackWithArgs('Hello!', cb);
        // console.log(cb.mock);
        expect(cb).toHaveBeenCalledWith([1, 2, 3]);
        expect(cb).toHaveBeenCalledWith('Hello!');  
        expect(cb).toHaveBeenLastCalledWith('Hello!');
    });
});

describe('La función forEach', () => {
    it('Invoca el callback sobre cada elemento del array', () => {
        const cb = jest.fn((element) => console.log(element));
        forEach([1, 2, 3], cb);
        expect(cb).toHaveBeenCalledTimes(3);
        expect(cb.mock.calls.length).toBe(3);
    });
});

// jest.fn(() => {});
    // jest.fn()
        // .mockImplementation();
        // .mockImplementationOnce()
        // .mockReturnValue().mockReturnValueOnce();
        // .mockResolvedValue().mockResolvedValueOnce();
        // .mockRejectedValue()mockRejectedValueOnce();

