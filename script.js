let usuarios = JSON.parse(localStorage.getItem('users')) || [];

function calcularIMC(usuario) {
    let altura = Math.round(usuario.altura) / 100;
    let peso = Math.round(usuario.peso);
    let indice = peso / Math.pow(altura, 2);
    let resultado = '';

    switch (usuario.sexo) {
        case 'm':
            if (indice < 20) {
                resultado = 'Tu peso es inferior al normal.';
            } else if (indice >= 20 && indice < 24) {
                resultado = 'Tu peso es normal.';
            } else if (indice >= 24 && indice < 29) {
                resultado = 'Tu peso es superior al normal.';
            } else {
                resultado = 'De acuerdo a tu IMC, posees obesidad.';
            }
            break;
        case 'h':
            if (indice < 21) {
                resultado = 'Tu peso es inferior al normal.';
            } else if (indice >= 21 && indice < 25) {
                resultado = 'Tu peso es normal.';
            } else if (indice >= 25 && indice < 30) {
                resultado = 'Tu peso es superior al normal.';
            } else {
                resultado = 'De acuerdo a tu IMC, posees obesidad.';
            }
            break;
        default:
            resultado = 'No se ha podido calcular. No ha indicado si m (mujer) u h (hombre).';
    }

    return {
        indice: indice.toFixed(2),
        resultado: resultado
    };
}

function mostrarResultadoIMC(usuario) {
    let resultado = calcularIMC(usuario);

    let mensaje = 'Sexo: ' + (usuario.sexo === 'm' ? 'Mujer' : 'Hombre') + ', Altura: ' + usuario.altura + ' cm, Peso: ' + usuario.peso + ' kg\n\n';
    mensaje += 'IMC: ' + resultado.indice + ', Clasificación: ' + resultado.resultado;

    alert(mensaje);
}

function obtenerDatosUsuario() {
    let gender = document.getElementById('gender').value;
    let height = parseInt(document.getElementById('height').value);
    let weight = parseInt(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        alert('Por favor, ingrese valores válidos para la altura y el peso.');
        return;
    }

    let usuario = {
        sexo: gender,
        altura: height,
        peso: weight
    };

    usuarios.push(usuario);
    localStorage.setItem('users', JSON.stringify(usuarios));

    mostrarResultadoIMC(usuario);
}

document.getElementById('calculateBtn').addEventListener('click', obtenerDatosUsuario);