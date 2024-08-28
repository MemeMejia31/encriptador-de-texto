document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.querySelector(".form_input");
    const mensaje = document.querySelector(".result_text");
    const copiarBtn = document.querySelector("#copiarBtn");
    const encriptarBtn = document.querySelector("#encriptarBtn");
    const desencriptarBtn = document.querySelector("#desencriptarBtn");
    const resultContainer = document.querySelector(".result");
    const resultTitle = document.querySelector(".result_title");
    const loader = document.querySelector(".loader");
    const resultImg = document.querySelector(".result_img");
    const alertSpan = document.querySelector(".alert_msj span");

    // Define la matriz de códigos
    const matrizCodigo = [
        ["a", "ai"], 
        ["e", "enter"], 
        ["i", "imes"], 
        ["o", "ober"], 
        ["u", "ufat"]
    ];

    // Función para encriptar el texto
    function encriptar(texto) {
        // Ordena la matriz por longitud del código en orden descendente
        const sortedMatrizCodigo = matrizCodigo.slice().sort((a, b) => b[1].length - a[1].length);
        return sortedMatrizCodigo.reduce((acc, [letra, codigo]) =>
            acc.replaceAll(letra, codigo), texto.toLowerCase());
    }

    // Función para desencriptar el texto
    function desencriptar(texto) {
        // Ordena la matriz por longitud del código en orden ascendente
        // Esto asegura que se reemplacen primero los códigos más largos
        const sortedMatrizCodigo = matrizCodigo.slice().sort((a, b) => a[1].length - b[1].length);
        return sortedMatrizCodigo.reduce((acc, [letra, codigo]) =>
            acc.replaceAll(codigo, letra), texto.toLowerCase());
    }

    // Función para normalizar el texto
    function normalizarTexto(texto) {
        return texto.toLowerCase()
            .normalize('NFD') 
            .replace(/[\u0300-\u036f]/g, '');
    }

    // Función para actualizar el resultado
    function actualizarResultado(texto, tipo) {
        mensaje.innerText = texto;
        resultContainer.classList.remove('hidden');
        copiarBtn.classList.remove('hidden');
        resultTitle.classList.remove('hidden');
        resultTitle.innerText = tipo; 
    }

    // Función para copiar el texto al portapapeles
    function copiarTexto() {
        navigator.clipboard.writeText(mensaje.innerText)
            .then(() => {
                alert('¡Texto copiado al portapapeles!');
                mensaje.innerText = ""; 
                verificarTexto(); 
                resultTitle.classList.add('hidden'); 
            })
            .catch(err => console.error('Error al copiar el texto: ', err));
    }

    // Función para mostrar el loader
    function mostrarLoader() {
        loader.classList.remove('hidden');
        resultImg.classList.add('hidden');
        resultTitle.classList.add('hidden'); 
    }

    // Función para ocultar el loader
    function ocultarLoader() {
        loader.classList.add('hidden');
        resultImg.classList.remove('hidden');
        verificarTexto(); 
    }

    // Función para verificar si el área de texto está vacía
    function verificarTexto() {
        resultTitle.classList.toggle('hidden', textArea.value.trim() !== "");
    }

    // Función para verificar caracteres especiales
    function verificarCaracteres() {
        const texto = textArea.value;
        const contieneCaracteresEspeciales = /[0-9!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~]/.test(texto);

        alertSpan.style.color = contieneCaracteresEspeciales ? 'red' : '';
    }

    // Event listeners para el área de texto y los botones
    textArea.addEventListener('input', () => {
        textArea.value = normalizarTexto(textArea.value);
        mostrarLoader();
        verificarTexto();
        verificarCaracteres();
    });

    encriptarBtn.addEventListener('click', () => {
        const textoEncriptado = encriptar(textArea.value);
        actualizarResultado(textoEncriptado, "Texto encriptado");
        textArea.value = "";
        ocultarLoader();
    });

    desencriptarBtn.addEventListener('click', () => {
        const textoDesencriptado = desencriptar(textArea.value);
        actualizarResultado(textoDesencriptado, "Texto desencriptado");
        textArea.value = "";
        ocultarLoader();
    });

    copiarBtn.addEventListener('click', copiarTexto);

    verificarTexto();
});
