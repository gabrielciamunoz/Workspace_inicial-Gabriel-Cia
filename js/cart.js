//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){

    fetch(CART_INFO_URL)
        .then(function (data) {
            return data.json();
        })
        .then(function (myJson) {
            mostrarCarrito(myJson);
        })
    function mostrarCarrito(data){
        maxIndex = data.articles.length ;
        for (var i = 0; i < maxIndex; i++) {
            let htmlContentToAppend =`
            <p class=" item"><b>Articulo: </b>` +data.articles[i].name+ `</span>  
            <b>Costo Unitario:</b> ` + data.articles[i].unitCost+ `$ 
            <b>Cantidad:</b><input type="number" required min="1" placeholder="` +data.articles[i].count+ `"> </p>
            `;
        document.getElementById("contenedorArticulos").innerHTML += htmlContentToAppend;
        }
        var subTotal = 0;
        for (var i = 0; i < maxIndex; i++) {
        subTotal += data.articles[i].unitCost * data.articles[i].count;
        document.getElementById("subTotal").innerHTML = subTotal + "$";
        }
    }

});
        function precioEnvio(){
            fetch(CART_INFO_URL)
            .then(function (data) {
                return data.json();
            })
            .then(function (myJson) {
            maxIndex = myJson.articles.length ;
            var subTotal = 0;
            for (var i = 0; i < maxIndex; i++) {
            subTotal += myJson.articles[i].unitCost * myJson.articles[i].count;
            }
            envio = document.getElementById("envio").value;
            PrecioEnvio = ((subTotal * envio) /  100); 
            document.getElementById("precioEnvio").innerHTML = PrecioEnvio + "$";
            PrecioTotal = PrecioEnvio + subTotal;
            document.getElementById("precioTotal").innerHTML = PrecioTotal + "$";

            })       
        }