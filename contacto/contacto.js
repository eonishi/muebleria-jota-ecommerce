const formulario = document.getElementById("formularioDeContacto");
const estado = document.getElementById("estado");

function handleSubmit(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    estado.classList.remove("error", "exito"); // limpio clases previas

    if (!nombre || !email || !mensaje) {
        estado.textContent = "Por favor, complete los campos";
        estado.className = "error";
        return;
    }

    const elEmailEsVelido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!elEmailEsVelido.test(email)) {
        estado.textContent = "Ingrese un email válido";
        estado.className = "error";
        return;
    }

    estado.textContent = "¡Gracias " + nombre + ", recibimos tu mensaje!";
    estado.className = "exito";

    formulario.reset();
}
formulario.addEventListener("submit", handleSubmit);

// ---------------- Menú hamburguesa ----------------
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}