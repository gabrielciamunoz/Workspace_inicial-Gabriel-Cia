document.addEventListener("DOMContentLoaded", function (e) {
    showSpinner();
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            mostrarLista(categoriesArray);
        }
        hideSpinner();
    });
});
var categoriesArray = [];
function mostrarLista(array) {
    let htmlContentToAppend = "";
    array.forEach(item => {
        htmlContentToAppend += `
        <div>             
        <hr>
        <a href="product-info.html?`+item.name+`"> <img src="` + item.imgSrc + `" alt="` + item.description + `" class="imagen"> </a>              
        <h4> <a href="product-info.html?`+item.name+`">`+ item.name + `</a></h4>                
        <p>`+ item.description + ` <small class="vendidos">Vendidos:` + item.soldCount + ` </small></p> 
        <p class="precio">Precio: <span class="numero">` + item.currency + ` ` + item.cost + ` </span></p>                                                              
        </div>
        `
    });
    document.getElementById("list-container").innerHTML = htmlContentToAppend;
}

function filtroEntre() {
    fetch(PRODUCTS_URL)
        .then(function (data) {
            return data.json();
        })
        .then(function (myJson) {
            filtrar(myJson)
        })
    function filtrar(datos) {
        if (document.getElementById("precioMax").value == "" || document.getElementById("precioMin").value == ""){
            alert("Debes ingresar el precio Minimo y Maximo")
        }else{
        const arreglo = datos.filter((fax) => {
            return (fax.cost <= document.getElementById("precioMax").value && fax.cost >= document.getElementById("precioMin").value);
        });
        mostrarLista(arreglo);    
        }
        
    }
}

function filtroMayorAMenor() {
    fetch(PRODUCTS_URL)
        .then(function (data) {
            return data.json();
        })
        .then(function (myJson) {
            filtrar(myJson)
        })
    function filtrar(datos) {
        const arreglo = datos.sort(function (a, b) {
            return parseFloat(b.cost) - parseFloat(a.cost);
        });
        mostrarLista(arreglo);
    }
}

function filtroMenorAMayor() {
    fetch(PRODUCTS_URL)
        .then(function (data) {
            return data.json();
        })
        .then(function (myJson) {
            filtrar(myJson)
        })
    function filtrar(datos) {
        const arreglo = datos.sort(function (a, b) {
            return parseFloat(a.cost) - parseFloat(b.cost);
        });
        mostrarLista(arreglo);
    }
}

function filtroMasVendido() {
    fetch(PRODUCTS_URL)
        .then(function (data) {
            return data.json();
        })
        .then(function (myJson) {
            filtrar(myJson)
        })
    function filtrar(datos) {
        const arreglo = datos.sort(function (a, b) {
            return parseFloat(b.soldCount) - parseFloat(a.soldCount);
        });
        mostrarLista(arreglo);
    }
}

function filtroString() {
    fetch(PRODUCTS_URL)
        .then(function (data) {
            return data.json();
        })
        .then(function (myJson) {
            filtrar(myJson)
        })
    function filtrar(datos) {
        const arreglo = datos.filter(function (item) {
            return item.name.toLowerCase().includes(document.getElementById("stringBusqueda").value) || item.description.toLowerCase().includes(document.getElementById("stringBusqueda").value);
        })
        mostrarLista(arreglo);
    }
}