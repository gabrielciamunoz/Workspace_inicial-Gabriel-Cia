var sPaginaURL = window.location.search.substring(1);
param = decodeURIComponent(sPaginaURL);
var contador = 0;
var contadorPre = 0;

function agregarEstrellas() {
    contenedorDeEstrellas = document.createElement('div');
    contenedorDeEstrellas.classList.add('estrellas');
    contenedorDeEstrellas.innerHTML = `
    <span class="fa fa-star " ></span>
    <span class="fa fa-star " ></span>
    <span class="fa fa-star" ></span>
    <span class="fa fa-star" ></span>
    <span class="fa fa-star" ></span>
    ` ;
    var estrellas = contenedorDeEstrellas.getElementsByClassName('fa-star');
    var calificacion = document.getElementById('exampleFormControlSelect1').value;
    for (let i = 0; i < 5; i++) {
        if (i < calificacion) {
            estrellas[i].classList.add('checked')
        }
    }
    document.getElementById("estrellas" + contador + "").appendChild(contenedorDeEstrellas);
    contador++;
}

function agregarEstrellasPre(numero) {
    contenedorDeEstrellasPre = document.createElement('div');
    contenedorDeEstrellasPre.classList.add('estrellas');
    contenedorDeEstrellasPre.innerHTML = `
    <span class="fa fa-star " ></span>
    <span class="fa fa-star " ></span>
    <span class="fa fa-star" ></span>
    <span class="fa fa-star" ></span>
    <span class="fa fa-star" ></span>
    ` ;
    var estrellas = contenedorDeEstrellasPre.getElementsByClassName('fa-star');
    var calificacion = numero;
    for (let i = 0; i < 5; i++) {
        if (i < calificacion) {
            estrellas[i].classList.add('checked')
        }
    }
    document.getElementById("estrellasPre" + contadorPre + "").appendChild(contenedorDeEstrellasPre);


}

function mostrarLista(array) {
    var maxIndexImgs;
    maxIndexImgs = array.images.length - 1;
    let htmlContentToAppend = `
        <div>             
        <div class="centrado">
        <h1>`+ param + `</h1>                
        </div>

        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner" id="contImagenes">
          
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

        <p>`+ array.description + `</p> 
        <p class="precio">Precio: <span class="numero">` + array.currency + ` ` + array.cost + ` </span><span class="derecha">Vendidos:` + array.soldCount + `</span></p>                                                              
        </div>
        `
        ;

    document.getElementById("container p-5").innerHTML = htmlContentToAppend;
    htmlContentToAppend = "";
    for (let i = 0; i < maxIndexImgs; i++) { 
        if(i == 0){
            htmlContentToAppend += ` 
            <div class="carousel-item active">
                <img class="d-block w-100" src="` + array.images[i] + `" > 
            </div> 
            `
        } else {
            htmlContentToAppend += `
            <div class="carousel-item">
                <img class="d-block w-100" src="` + array.images[i] + `">
            </div>
            `
        }
    }
    document.getElementById("contImagenes").innerHTML = htmlContentToAppend;

};

function mostrarCom(data) {
    data.forEach(item => {
        let htmlContentToAppend = "";
        const regexNombre = /_/g;
        nombreEspaciado = item.user.replace(regexNombre, ' ');
        htmlContentToAppend += `
        <p>
        <div class="card">                          
        <p class="card-title"> <span class="nombre">` + nombreEspaciado + `</span> <span class="fecha">` + item.dateTime + `</span></p>                
        <p class="card-text">` + item.description + `</p> 
        <p class="card-text">Puntuación: ` + item.score + `/5 </p> 
        <span id="estrellasPre`+ contadorPre + `"></span>                                                             
        </div>
        </p>
        `;
        document.getElementById("container comentarios").innerHTML += htmlContentToAppend;
        agregarEstrellasPre(item.score);
        contadorPre++;
    });
};

function mostrarRelacionados(array) {
    relacionados = array.relatedProducts;
    fetch(PRODUCTS_URL)
        .then(function (data) {
            return data.json();
        })
        .then(function (myJson) {
            mostrarRelacionados(myJson);
        })
    function mostrarRelacionados(data) {
        var maxIndex;
        maxIndex = relacionados.length - 1;
        for (var i = 0; i <= maxIndex; i++) {
            numero = relacionados[i];
            let htmlContentToAppend = `
        <div>             
        <a href="product-info.html?`+ data[numero].name + `"> <img src="` + data[numero].imgSrc + `" alt="` + data[numero].description + `" class="imagen"> </a>              
        <h4> <a href="product-info.html?`+ data[numero].name + `">` + data[numero].name + `</a></h4>                
        <p>`+ data[numero].description + `</p>                                                    
        </div>
        `;
            document.getElementById("Relacionados").innerHTML += htmlContentToAppend;
        }
    }
};

document.addEventListener("DOMContentLoaded", function (e) {
    showSpinner();

    fetch(PRODUCT_INFO_URL)
        .then(function (data) {
            return data.json();
        })
        .then(function (myJson) {
            mostrarLista(myJson)
        })

    fetch(PRODUCT_INFO_COMMENTS_URL)
        .then(function (data) {
            return data.json();
        })
        .then(function (myJson) {
            mostrarCom(myJson);
        })

    fetch(PRODUCT_INFO_URL)
        .then(function (data) {
            return data.json();
        })
        .then(function (myJson) {
            mostrarRelacionados(myJson);
        })

    hideSpinner();
});;

document.getElementById("enviar").addEventListener("click", function (event) {
    event.preventDefault();
    comentario = document.getElementById("exampleFormControlTextarea1").value;
    puntuacion = document.getElementById("exampleFormControlSelect1").value;
    if (comentario == "") {
        alert("Debes ingresar un comentario")
    } else {
        var usuario = JSON.parse(sessionStorage.getItem("Usuario"));
        var hoy = new Date();
        var date = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
        var hora = new Date();
        var time = hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds();
        let htmlContentToAppend = "";
        htmlContentToAppend += `
    <p>
    <div class="card">                          
    <p class="card-title"> <span class="nombre">` + usuario.nombre + `</span> <span class="fecha">` + date + " " + time + `</span></p>                
    <p class="card-text">` + comentario + `</p> 
    <span id="estrellas`+ contador + `">
    </span>                                                             
    </div>
    </p>
    `;
        document.getElementById("container comentarios").innerHTML += htmlContentToAppend;
        agregarEstrellas()
        alert("Comentario publicado");
    }
});