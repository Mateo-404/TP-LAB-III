function comprobarFormulario() {
  event.preventDefault();

  let flag = true;
  let error = "Surgieron los siguentes errores: \n";

  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const telefono = document.getElementById("telefono").value;
  const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
  const email = document.getElementById("email").value;

  // Validación nombre
  if (nombre == "") {
    error += "- FALTA RELLENAR EL NOMBRE \n";
    flag = false;
  }
  // Validación apellidos
  if (apellidos == "") {
    error += "- FALTAN RELLENAR LOS APELLIDOS \n";
    flag = false;
  }
  // Validación telefono
  if (telefono == "") {
    error += "- FALTA RELLENAR EL TELÉFONO \n";
    flag = false;
  } else if (telefono.length < 10) {
    error += "- TELÉFONO INVÁLIDO \n";
    flag = false;
  }

  // Validación fecha de nacimiento
  if (fecha_nacimiento === "") {
    error += "- FALTA RELLENAR LA FECHA DE NACIMIENTO \n";
    flag = false;
  } else if (esMenorEdad(fecha_nacimiento)) {
    error += "- LA PERSONA DEBE DE SER MAYOR DE EDAD \n";
    flag = false;
  }
  // Validación email
  if (email == "") {
    error += "- FALTA RELLENAR EL EMAIL \n";
    flag = false;
  } else if (!email.includes("@")) {
    error += "- EMAIL INVÁLIDO \n";
    flag = false;
  }
  // Validación aceptar terminos y condiciones
  if (!document.getElementById("aceptar_terminos_condiciones").checked) {
    error += "- FALTA ACEPTAR TERMINOS Y CONDICIONES \n";
    flag = false;
  }
  const enviarBtn = document.getElementById("enviar_form").querySelector("button");
  // Enviar formulario
  if (flag) {
    enviarBtn.classList.remove("error");
    enviarBtn.classList.add("success");
    alert("¡FORMULARIO ENVIADO CON ÉXITO!");
    document.getElementById("formulario").submit();
  } else {
    enviarBtn.classList.remove("success");
    enviarBtn.classList.add("error");
    alert(error);
  };
}

function esMenorEdad(fecha_nacimiento) {
  const anios =
    //Año actual - año de nacimiento
    new Date().getFullYear() - new Date(fecha_nacimiento).getFullYear();
  return (
    anios < 18 ||
    (anios === 18 &&
      //Mes actual < mes de nacimiento
      new Date().getMonth() + 1 < fecha_nacimiento.substring(5, 7))
  );
}

// <-- Cargar Noticias -->
// Función para cargar y mostrar las noticias desde el JSON
async function mostrarNoticias() {
  try {
    const response = await fetch('news.json'); // Cargar el archivo JSON
    const noticias = await response.json();   // Convertir respuesta a JSON

    const noticiasContainer = document.getElementById('noticias'); // Contenedor donde se agregarán las noticias

    let Contador = 0; // Contador de tarjetas creadas
    let row = null; // Variable para el div row actual

    noticias.forEach(noticia => {
      if (Contador % 12 === 0) {
        // Crear una nueva fila cada 12 tarjetas
        row = document.createElement('div');
        row.classList.add('row', 'noticias');
        noticiasContainer.appendChild(row);
      }

      // Crear Carta para cada Noticia
      const col = document.createElement('div');
      col.classList.add('col');

      const article = document.createElement('article');

      const card = document.createElement('div');
      card.classList.add('card');
      card.style.width = '18rem';

      const img = document.createElement('img');
      img.src = noticia.imagen;
      img.classList.add('card-img-top');
      img.alt = noticia.titulo;
      img.title = noticia.titulo;

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const titulo = document.createElement('h3');
      titulo.textContent = noticia.titulo;
      titulo.classList.add('card-title'); // Añadir clase 'card-title' para el título

      const descripcion = document.createElement('p');
      descripcion.textContent = noticia.descripcion;
      descripcion.classList.add('card-text'); // Añadir clase 'collapse' para la descripción inicialmente oculta

      const btnNoticia = document.createElement('div');
      btnNoticia.classList.add('btn-noticia');

      const enlace = document.createElement('a');
      enlace.classList.add('btn', 'btn-success');
      enlace.textContent = 'Ver noticia';

      // Construir la estructura de la tarjeta
      btnNoticia.appendChild(enlace);
      cardBody.appendChild(titulo);
      cardBody.appendChild(descripcion);
      cardBody.appendChild(btnNoticia);
      card.appendChild(img);
      card.appendChild(cardBody);
      article.appendChild(card);
      col.appendChild(article);

      // Agregar la tarjeta al último div row creado
      row.appendChild(col);

      Contador++; // Incrementar el Contador de Tarjetas
    });

  } catch (error) {
    console.error('Error al cargar las noticias:', error);
  }
}


// Verificar si estamos en la página 'news.html' antes de cargar las noticias
if (window.location.pathname.includes('news.html')) {
  mostrarNoticias().catch(error => console.error('Error al mostrar las noticias:', error)); // Llamar a la función para cargar las noticias
}

