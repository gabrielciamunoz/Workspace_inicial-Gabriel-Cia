const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

if((!sessionStorage.getItem("check"))&& !(location.href.endsWith("login.html"))){
  location.href="login.html"
}
function logout(){
  event.preventDefault();
  sessionStorage.removeItem("check");
  sessionStorage.removeItem("Usuario");
  window.location.href="login.html";
}

document.addEventListener("DOMContentLoaded", function(e){
  if(sessionStorage.getItem("check")){
  var usuario = JSON.parse(sessionStorage.getItem("Usuario"));
  let linkPerfil = document.createElement("a");
  linkPerfil.href = "my-profile.html";
  linkPerfil.innerHTML = usuario.nombre;
  linkPerfil.className = "py-2 d-none d-md-inline-block";
  let logOut = document.createElement("a");
  logOut.innerHTML = "Cerrar Sesion";
  logOut.href= "#";
  logOut.setAttribute("onclick","logout();return false");
  document.querySelector("nav.site-header").lastElementChild.appendChild(linkPerfil);
  document.querySelector("nav.site-header").lastElementChild.appendChild(logOut);
  }
});