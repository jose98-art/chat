const socketClient = io();

//elementos
const nombreUsuario = document.getElementById("nameUser");
const formulario = document.getElementById("formulario");
const inputMensaje = document.getElementById("mensaje");
const chatParrafo = document.getElementById("chat");

let usuario = null;

if (!usuario) {
  swal
    .fire({
      title: "BIENVENIDO",
      text: "Ingresa tu usuario",
      input: "text",
      inputValidator: (value) => {
        if (!value) {
          return "Necesitas ingresar un usuario";
        }
      },
    })
    .then((username) => {
      usuario = username.value;
      nombreUsuario.innerText = usuario;
      socketClient.emit("nuevoUsuario", usuario);
    });
}

formulario.onsubmit = (event) => {
    
    event.preventDefault()

  const info = {
    nombre: usuario,
    mensaje: inputMensaje.value,
  };

  socketClient.emit("mensaje", info);
  inputMensaje.value = "";
};

socketClient.on("chat", (mensajes) => {
//   console.log(mensajes);
  const chatRender = mensajes
    .map((elem) => {
      return `<p><strong>${elem.nombre}:</strong> ${elem.mensaje}</p>`;
    })
    .join(" ");
  chatParrafo.innerHTML = chatRender;
});

socketClient.on('broadcast', usuario=>{
    Toastify({
        text: `Ingreso ${usuario} al chat`,
        duration: 5000,
        position:' right',
        style:{
            background: "linear-gradient(to right, #00b09b, #96c93d)"
        }
    }).showToast()
})
