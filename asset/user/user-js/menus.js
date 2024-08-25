const containerPizza = document.getElementById("container-pizza");
const menuCategory = document.getElementById("menu-category");
// add product

// render pizza
function renderMenuPizza() {
  const categorys = JSON.parse(localStorage.getItem("categorys")) || [];
  const products = JSON.parse(localStorage.getItem("products")) || [];
  let stringPizza = ``;
  for (let i = 0; i < products.length; i++) {
    if (products[i].category == 1) {
      stringPizza += `
    <div class="pizza-items">
      <div class="pizza-item">
        <div class="img-pizza">
          <img src="${products[i].image}" />
        </div>
        <div class="icon-heart">
          <i class="bx bxs-heart"></i>
        </div>
        <div class="pizza-dish-name">
          <a onclick = "pushProducts(${products[i].id})"><h3>${products[i].name}</h3></a>
        </div>
        <div class="pizza-text">
          <p>
          ${products[i].description}
          </p>
        </div>
        <div class="price-pizza">
          <div class="size">
            <span>M:</span>
            <p class="priceM">${products[i].price}VND</p>
          </div>
          <div class="size">
            <span>L:</span>
            <p class="priceM">${products[i].price}VND</p>
          </div>
        </div>
        <button class="view-card-pizza btn" onclick="innitCart(${products[i].id})">Add To Card</button>
      </div>
    </div>
          `;
    }
  }

  containerPizza.innerHTML = stringPizza;
}
renderMenuPizza();

//  render spaghetti
function renderMenuSpaghetti() {
  const categorys = JSON.parse(localStorage.getItem("categorys")) || [];
  const products = JSON.parse(localStorage.getItem("products")) || [];
  let stringPizza = ``;

  for (let i = 0; i < products.length; i++) {
    if (products[i].category == 2) {
      stringPizza += `
      <div class="chicken-items">
      <div class="chicken-item">
        <div class="img-chicken">
          <img src="${products[i].image}" />
        </div>
        <div class="icon-heart">
          <i class="bx bxs-heart"></i>
        </div>
        <div class="chicken-dish-name">
          <a><h3>${products[i].name}</h3></a>
        </div>
        <div class="chicken-text">
          <p>
          ${products[i].description}
          </p>
        </div>
        <button class="view-card btn">Add To Card</button>
        <span class="price-chicken">${products[i].price}Vnd</span>
      </div>
    </div>
          `;
    }
  }

  document.getElementById("container-spaghetti").innerHTML = stringPizza;
}
renderMenuSpaghetti();
// render chicken
function renderMenuChicken() {
  const categorys = JSON.parse(localStorage.getItem("categorys")) || [];
  const products = JSON.parse(localStorage.getItem("products")) || [];
  let stringPizza = ``;

  for (let i = 0; i < products.length; i++) {
    if (products[i].category == 3) {
      stringPizza += `
      <div class="chicken-items">
      <div class="chicken-item">
        <div class="img-chicken">
          <img src="${products[i].image}" />
        </div>
        <div class="icon-heart">
          <i class="bx bxs-heart"></i>
        </div>
        <div class="chicken-dish-name">
          <a><h3>${products[i].name}</h3></a>
        </div>
        <div class="chicken-text">
          <p>
          ${products[i].description}
          </p>
        </div>
        <button class="view-card btn">Add To Card</button>
        <span class="price-chicken">${products[i].price}Vnd</span>
      </div>
    </div>
          `;
    }
  }

  document.getElementById("container-chicken").innerHTML = stringPizza;
}
renderMenuChicken();

// render drinks
function renderMenuDrinks() {
  const categorys = JSON.parse(localStorage.getItem("categorys")) || [];
  const products = JSON.parse(localStorage.getItem("products")) || [];
  let stringPizza = ``;

  for (let i = 0; i < products.length; i++) {
    if (products[i].category == 4) {
      stringPizza += `
      <div class="chicken-items">
      <div class="chicken-item">
        <div class="img-chicken">
          <img src="${products[i].image}" />
        </div>
        <div class="icon-heart">
          <i class="bx bxs-heart"></i>
        </div>
        <div class="chicken-dish-name">
          <a><h3>${products[i].name}</h3></a>
        </div>
        <div class="chicken-text">
          <p>
          ${products[i].description}
          </p>
        </div>
        <button class="view-card btn">Add To Card</button>
        <span class="price-chicken">${products[i].price}Vnd</span>
      </div>
    </div>
          `;
    }
  }

  document.getElementById("container-drinks").innerHTML = stringPizza;
}
renderMenuDrinks();
// show chicken menus popup

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-card")) {
    toggleChickenPopup();
    chickenDetail(e.target.parentElement);
  }
});
function toggleChickenPopup() {
  document.querySelector(".popup-chicken").classList.add("open");
  document.body.classList.toggle("hide-scrolling");
}
document.querySelector("#close-popup").onclick = () => {
  document.querySelector(".popup-chicken").classList.remove("open");
  document.querySelector("#close-popup").classList.remove("hide");
};
// hide popup when clicking outside of it

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup-chicken")) {
    toggleChickenPopup();
  }
});

function chickenDetail(chickenItem) {
  document.querySelector(".popup-chicken-img img").src =
    chickenItem.querySelector(".img-chicken img").src;
  document.querySelector(".chicken-name h3").innerHTML =
    chickenItem.querySelector(".chicken-dish-name h3").innerHTML;
  document.querySelector(".chicken-text-popup p").innerHTML =
    chickenItem.querySelector(".chicken-text p").innerHTML;
  document.querySelector(".price").innerHTML =
    chickenItem.querySelector(".price-chicken ").innerHTML;
}

//popup pizza
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-card-pizza")) {
    togglePizzaPopup();
    pizzaDetail(e.target.parentElement);
  }
});
function togglePizzaPopup() {
  document.querySelector(".popup-pizza").classList.toggle("open");
  document.body.classList.toggle("hide-scrolling");
}
document.getElementById("close-pizza").addEventListener("click", () => {
  document.querySelector(".popup-pizza").classList.remove("open");
});
function pizzaDetail(pizzaItem) {
  // console.log(pizzaItem);
  document.querySelector(".popup-pizza-img img").src =
    pizzaItem.querySelector(".img-pizza img").src;
  document.querySelector(".pizza-name h3").innerHTML = pizzaItem.querySelector(
    ".pizza-dish-name h3"
  ).innerHTML;
  document.querySelector(".pizza-text-popup p").innerHTML =
    pizzaItem.querySelector(".pizza-text p").innerHTML;
  document.querySelector(".price-pizza-detailM").innerHTML =
    pizzaItem.querySelector(".priceM").innerHTML;
  document.querySelector(".price-pizza-detailL").innerHTML =
    pizzaItem.querySelector(".priceM").innerHTML;
  document.querySelector(".price-pizza-pop").innerHTML =
    pizzaItem.querySelector(".priceM").innerHTML;
}
// open  cart
document.getElementById("cart-icon").addEventListener("click", () => {
  document.getElementById("cart").classList.toggle("open");
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("order-now")) {
    toggleCart();
  }
});
function toggleCart() {
  document.getElementById("cart").classList.add("open");
  document.querySelector(".popup-pizza").classList.remove("open");
  document.getElementById("quantity").innerHTML = "";
}
document.getElementById("Continue").addEventListener("click", () => {
  document.getElementById("cart").classList.remove("open");
});
// render details menu
function pushProducts(id) {
  const value = {
    productsId: id,
  };
  localStorage.setItem("productsId", JSON.stringify(value));
  window.location.href = "./menusdetail.html";
}
//
let indexId = document.getElementById("cartId");
function innitCart(id) {
  indexId.value = id;
}

function addToCart() {
  const quantity = document.getElementById("quantity");
  const sizeSmall = document.getElementById("sizeSmall");
  const sizeBig = document.getElementById("sizeBig");

  let carts = JSON.parse(localStorage.getItem("carts")) || [];
  const products = JSON.parse(localStorage.getItem("products")) || [];
  let productsId = products.findIndex((item) => item.id == indexId.value);
  const value = {
    id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
    name: products[productsId].name,
    quantity: +quantity.value,
    price: +products[productsId].price,
    image: products[productsId].image,
    productId: products[productsId].id,
    size: products[productsId].size,
    sizeSmall: sizeSmall.value,
  };
  if (carts.length > 0) {
    let check = true;
    for (let i in carts) {
      if (carts[i].productId == indexId.value) {
        carts[i].quantity += 1;
        check = true;
        localStorage.setItem("carts", JSON.stringify(carts));
        renderTotal();
        break;
      } else {
        check = false;
      }
    }
    if (!check) {
      carts.push(value);
      localStorage.setItem("carts", JSON.stringify(carts));
      renderTotal();
    }
  } else {
    carts.push(value);
    localStorage.setItem("carts", JSON.stringify(carts));
    renderTotal();
  }

  renderCarts();
}
function renderTotal() {
  let carts = JSON.parse(localStorage.getItem("carts")) || [];
  let total = 0;
  for (let i in carts) {
    total += carts[i].quantity * carts[i].price;
  }

  document.getElementById("total").innerHTML = total;
}
renderTotal();

function deleteCarts(id) {
  let carts = JSON.parse(localStorage.getItem("carts")) || [];
  let indexId = carts.findIndex((item) => item.id === id);
  carts.splice(indexId, 1);
  localStorage.setItem("carts", JSON.stringify(carts));
  renderCarts();
  renderTotal();
}
const numberCart = document.getElementById("quantity-cart");
function calQuantity() {
  let carts = JSON.parse(localStorage.getItem("carts")) || [];
  let count = 0;
  for (let i = 0; i < carts.length; i++) {
    count = count + carts[i].quantity;
  }
  return count;
}

function renderCarts() {
  let carts = JSON.parse(localStorage.getItem("carts")) || [];
  let stringCarts = ``;
  for (let i = 0; i < carts.length; i++) {
    stringCarts += `
    <div class="cart-item">
      <div class="img-cart">
        <img src="${carts[i].image}" />
      </div>
      <div class="cart-content">
        <h3 class="name-cart">${carts[i].name}</h3>
        <span class="size-cart">${carts[i].size}</span>
        <p>${carts[i].sizeSmall}</p>
      </div>
      <div class="cart-price">
        <button class = deleteCart onclick="deleteCarts(${carts[i].id})"><i class='bx bxs-trash-alt'></i></button>
        <div class="number-cart">
        <p>${carts[i].quantity}</p>
     
        </div>
        <span>${carts[i].price}</span>
      </div>
      </div>
      <div class="line"></div>
    `;
  }
  numberCart.innerHTML = `
    ${calQuantity()}
  `;
  document.getElementById("cart-items").innerHTML = stringCarts;
}
renderCarts();
