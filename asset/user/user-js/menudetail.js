//click img

function clickImg(newImg) {
  let getImages = document.getElementById("images");
  getImages.src = newImg.src;
}
const a = document.getElementById("container-pizza-detail");
console.log(a);
// show related products

function renderPizzaRelate() {
  const categorys = JSON.parse(localStorage.getItem("categorys")) || [];
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productsDetail = JSON.parse(localStorage.getItem("productsId")) || [];
  let stringPizzaRelate = ``;
  for (let i = 0; i < products.length; i++) {
    if (
      products[i].category == 1 &&
      products[i].quantity >= 19 &&
      products[i].id !== productsDetail.productsId
    ) {
      stringPizzaRelate += `  
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
            <p>${products[i].price}vnd</p>
          </div>
          <div class="size">
            <span>L:</span>
            <p>${products[i].price}vnd</p>
          </div>
        </div>
        <button class="view-card-pizza btn">Add To Card</button>
      </div>
    </div>
          `;
    }
  }
  a.innerHTML = stringPizzaRelate;
}
renderPizzaRelate();

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
  console.log(pizzaItem);
  document.querySelector(".popup-pizza-img img").src =
    pizzaItem.querySelector(".img-pizza img").src;
  document.querySelector(".pizza-name h3").innerHTML = pizzaItem.querySelector(
    ".pizza-dish-name h3"
  ).innerHTML;
  document.querySelector(".pizza-text-popup p").innerHTML =
    pizzaItem.querySelector(".pizza-text p").innerHTML;
}
// render details menu

function pushProducts(id) {
  const value = {
    productsId: id,
  };
  localStorage.setItem("productsId", JSON.stringify(productsId));
  window.location.href = "./menusdetail.html";
}

function renderPizzaDetails() {
  let pId = JSON.parse(localStorage.getItem("productsId"));
  const products = JSON.parse(localStorage.getItem("products")) || [];
  let index = products.findIndex((item) => item.id == pId.productsId);
  let stringPizzaDetails = ``;
  stringPizzaDetails += `
    <div class="pizza-name-detail">
    <a><h1>${products[index].name}</h1></a>
  </div>
  <div class="card-detail">
    <div class="card-detail-left">
      <div class="img-big">
        <img src="${products[index].image}" id="images" />
      </div>
      <div class="img-small">
        <img src="./img/pizza1.jpeg" alt="" onclick="clickImg(this)" />
        <img src="./img/pizza2.jpeg" alt="" onclick="clickImg(this)" />
        <img src="./img/pizza4.jpeg" alt="" onclick="clickImg(this)" />
      </div>
      <span class="price-pizza-detail">${products[index].price}vnd</span>
      <div class="button-number">
        <i class="bx bx-plus"></i>
        <p>1</p>
        <i class="bx bx-minus"></i>
      </div>
    </div>

    <div class="card-detail-right">
      <h3>Chọn kích thước:</h3>
      <p>( Cỡ M: 6 miếng 22cm | Cỡ L: 8 miếng 30cm )</p>
      <div class="choose-size-detail">
        <div class="size-detail">
          <label for="price">M:</label>
          <p>${products[index].price}vnd</p>
          <input type="radio" />
        </div>
        <div class="size-detail">
          <label for="price">L:</label>
          <p>${products[index].price}vnd</p>
          <input type="radio" />
        </div>
      </div>
      <h3>Chọn đế</h3>
      <div class="choose-size-detail">
        <div class="size-detail">
          <label for="price">Mỏng:</label>
          <input type="radio" />
        </div>
        <div class="size-detail">
          <label for="price">Dày:</label>
          <input type="radio" />
        </div>
      </div>
      <h3>Chọn Thêm</h3>
      <div class="choose-size-detail">
        <div class="size-detail">
          <label for="price">Phomat:</label>
          <p>30vnd</p>
          <input type="checkbox" />
        </div>
        <div class="size-detail">
          <label for="price">Jambong:</label>
          <p>30vnd</p>
          <input type="checkbox" />
        </div>
        <div class="size-detail">
          <label for="price">Ngô:</label>
          <p>30vnd</p>
          <input type="checkbox" />
        </div>
      </div>

      <div class="message-detail">
        <textarea rows="5" placeholder="ghi chu"></textarea>
      </div>
      <div class="pizza-detail">
        <a><button class="btn">order now</button></a>
      </div>
    </div>
  </div>
  <div class="text-detail">
    <p>${products[index].description}</p>
  </div>
    `;
  document.getElementById("section-detail").innerHTML = stringPizzaDetails;
}

renderPizzaDetails();
