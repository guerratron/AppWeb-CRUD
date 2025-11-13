/*
// El código que se va a probar
function suma(a, b) {
    return a + b;
}

// La prueba
describe('Prueba de la función suma', function () {
    it('Debería sumar dos números correctamente', function () {
        // La afirmación
        expect(suma(2, 3)).toBe(5);
    });
});
*/

describe('Nombre de la suite de pruebas', function() {
  beforeEach(function() {
    // Código que se ejecuta antes de cada 'it'
  });

  it('Debería hacer algo específico', function() {
    // Lógica de la prueba
    expect(true).toBe(true);
  });

  afterEach(function() {
    // Código que se ejecuta después de cada 'it'
  });
});