//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});
function enviarAIndex() {
    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;
    if (usuario != "" && contrasena != "") {
        sessionStorage.setItem('check', 'si');
        location.href = "index.html";
    } else {
        alert("Debes ingresar tu Usuario y contraseña")
    }
    var datos = {
        nombre: (document.getElementById("usuario").value),
        contrasena: (document.getElementById("contrasena").value),
    }
    sessionStorage.setItem('Usuario', JSON.stringify(datos))
}