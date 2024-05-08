function comprobarFormulario() {
    let flag = true;
    let error = 'Surgieron los siguentes errores: \n';
    
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const telefono = document.getElementById('telefono').value;
    const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
    const email = document.getElementById('email').value;

    // Validación nombre
    if (nombre == '') {
        error += '- FALTA RELLENAR EL NOMBRE \n';
        flag = false;
    }
    // Validación apellidos
    if (apellidos == '') {
        error += '- FALTAN RELLENAR LOS APELLIDOS \n';
        flag = false;
    }
    // Validación telefono
    switch (telefono) {
        case '':            
            error += '- FALTA RELLENAR EL TELÉFONO \n';
            flag = false;
            break;
        case (telefono.length < 10):
            error += '- TELÉFONO INVÁLIDO \n';
        default:
            break;
    }
    // Validación fecha de nacimiento
    switch (fecha_nacimiento) {
        case calcularMayoriaEdad(fecha_nacimiento):
            error+= '- LA PERSONA DEBE DE SER MAYOR DE EDAD \n';
            flag = false;
            break;
    
        case '':
            error += '- FALTA RELLENAR LA FECHA DE NACIMIENTO \n';
            flag = false;
            break;
        default:
            break;
    }
    // Validación email
    if (email == '') {
        error += '- FALTA RELLENAR EL EMAIL \n';
        flag = false;
    }
    // Validación aceptar terminos y condiciones
    if (!document.getElementById('aceptar_terminos_condiciones').checked) {
        error += '- FALTA ACEPTAR TERMINOS Y CONDICIONES \n';
        flag = false;
    }

    if (!flag) {
        alert(error);
    }
}

function calcularMayoriaEdad(fecha_nacimiento) {
    const anios = new Date().getFullYear() - new Date(fecha_nacimiento).getFullYear();
    return (anios < 18 || (anios === 18 && new Date().getMonth() + 1 < fecha_nacimiento.substring(5, 7)));
};
