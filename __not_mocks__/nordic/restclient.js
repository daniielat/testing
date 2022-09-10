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
 // inicializar restclient? Creo que sí.
 const mockedRestclient = jest.fn().mockImplementation(() => ({
     get: mockGet,
     post: mockPost,
     put: mockPut,
     delete: mockDelete
 }));
 
 module.exports = mockedRestclient;
 // ¿Por qué exportamos uno por uno los métodos? Estudiar
 // modules más a fondo.
 // Estamos exportando uno por uno para poder hacer el require 
 // más sencillo. Leer más al respecto en /tests/unit/mocl_restclient2.spec.js
 module.exports.mockGet = mockGet;
 module.exports.mockPost = mockPost;
 module.exports.mockPut = mockPut;
 module.exports.mockDelete = mockDelete;
 