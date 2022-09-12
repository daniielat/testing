/**
 * Inicialiamos nuestras jest.fn() para cada mock de cada
 * método HTTP.
 */
const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPut = jest.fn();
const mockDelete = jest.fn();

// ¿Por qué estamos exportando una función, si cuando la
// requerimos en los test, no la invocamos? ¿Es porque en 
// el servicio sí la estamos invocando a la hora de 
// inicializar restclient?
// Creo que porque requerirla en los tests no impacta en 
// nada que tenga que ver con el mock, ya que tiene 
// hoisting máximo.
const mockedRestclient = jest.fn().mockImplementation(() => ({
    get: mockGet,
    post: mockPost,
    put: mockPut,
    delete: mockDelete
}));

module.exports = mockedRestclient;
// ¿Por qué exportamos uno por uno los métodos? 
// Para poder hacer el require más sencillo y para poder
// mockear la implementación de cada método para casos 
// específicos.
module.exports.mockGet = mockGet;
module.exports.mockPost = mockPost;
module.exports.mockPut = mockPut;
module.exports.mockDelete = mockDelete;
 