// ======== SHOW SIDEBAR===========
const navToggle = document.querySelector(".nav-toggler");
const sidebarAdmin = document.querySelector(".sidebar-admin");
const mainActive = document.querySelector(".main");

navToggle.addEventListener("click", () => {
  sidebarAdmin.classList.toggle("active");
  mainActive.classList.toggle("active");
  navToggle.classList.toggle("transition");
});

// ======== OPEN FROM===========

// ======== C/R/U/D==============

// -----------Initialize the variable and get the value in the html----------

// Initialize the variable show form
const productName = document.getElementById("name");
const productId = document.getElementById("number");
const productSize = document.getElementById("size");
const productImage = document.getElementById("input-image");
const img = document.getElementById("image-product");
const productPrice = document.getElementById("price");
const productQuantity = document.getElementById("quantity");
const productDescription = document.getElementById("description");
const category = document.getElementById("category");
const tableProduct = document.getElementById("table-product");
const pageList = document.getElementById("page-list");
const addProducts = document.getElementById("add-products");
const formProductsOpen = document.getElementById("form-section");
const closeForm = document.getElementById("cancel-product");
const btnSubmit = document.getElementById("submit-form");

// Initialize the variable show search
const searchIcon = document.getElementById("search-icon");
const searchOpen = document.getElementById("#text-search");

let pageSize = 8;
let totalPage = 1;
let currentPage = 1;

let textSearch = "";
let categoryFilter = "All";

let action = "add";

//  show form

addProducts.addEventListener("click", () => {
  formProductsOpen.classList.add("active");
});
closeForm.addEventListener("click", () => {
  formProductsOpen.classList.remove("active");
});

// function submit form
function submitForm(e) {
  e.preventDefault();

  if (action === "add") {
    const formData = new FormData(e.target);
    const values = {};
    for (let [name, value] of formData.entries()) {
      values[name] = value;
    }
    values.price = +values.price;
    values.quantity = +values.quantity;

    //add convertToBase64 vào image imageBase64
    values.image = imageBase64;

    let check = validateFileds(values); //B5 thêm trường kiểm tra check

    //B6: lưu lên local JSON
    if (check) {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      let id = 1;
      if (products.length > 0) {
        id = products[products.length - 1].id + 1;
      }
      values.id = id;
      values.status = true;
      products.push(values);
      localStorage.setItem("products", JSON.stringify(products));
      e.target.reset();
      productImage.src = "";
      imageBase64 = null;
      formProductsOpen.classList.remove("active");
      window.location.reload();
      render();
    }
  } else {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const indexUpdate = products.findIndex(
      (index) => index.id == productId.value
    );
    products[indexUpdate].name = productName.value;
    products[indexUpdate].image = productImage.src;
    products[indexUpdate].image = img.src;
    products[indexUpdate].quantity = productQuantity.value;
    products[indexUpdate].category = category.value;
    products[indexUpdate].description = productDescription.value;
    products[indexUpdate].size = productSize.value;
    products[indexUpdate].price = productPrice.value;
    localStorage.setItem("products", JSON.stringify(products));
    action = "add";
    btnSubmit.innerText = "Add";
    img.src = "";
    productImage.src = "";
    imageBase64 = null;
    e.target.reset();
    formProductsOpen.classList.remove("active");
    render();
  }
}

//B2: Nhập file ảnh chuyển đổi flie về ảnh dùng onchange="convertToBase64()
const imageProductHTML = document.getElementById("image-product");
let imageBase64 = null;

function convertToBase64() {
  const fileInput = document.getElementById("input-image");
  const file = fileInput.files[0];
  const reader = new FileReader(); //đọc data của 1 hình ảnh

  reader.onload = function (e) {
    const base64 = e.target.result;
    imageBase64 = base64;
    imageProductHTML.src = imageBase64;
  };
  reader.readAsDataURL(file);
}

//B4: Hiển thị thông báo messages
const toastifyHTML = document.getElementById("toastify");
const toastifyMessageHTML = document.getElementById("toastify-message");

function showToast(message) {
  toastifyHTML.classList.toggle("hidden");
  toastifyMessageHTML.innerHTML = message;
  const idTimeout = setTimeout(function () {
    toastifyHTML.classList.toggle("hidden");
    toastifyMessageHTML.innerHTML = "";
    clearTimeout(idTimeout);
  }, 2000);
}

// function check
function validateFileds(product) {
  let check = true;
  if (product.name.length < 4) {
    showToast("Name length < 4");
    return false;
  }
  if (product.price <= 0) {
    showToast("Price <= 0");
    return false;
  }
  if (product.quantity <= 0) {
    showToast("Quantity <=0");
    return false;
  }

  if (product.description.length <= 10) {
    showToast("Description <= 10");
    return false;
  }

  return check;
}
//B8 Chuyển dổi price sang tiền việt
function formatMoney(money) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(money);
}
//  Render product on the table in HTML

function render(data) {
  let realProducts = JSON.parse(localStorage.getItem("products")) || [];

  if (Array.isArray(data)) {
    realProducts = data;
  }

  // let stringProducts = ``;

  // for (let i = 0; i < products.length; i++) {
  //   stringProducts += `
  //                 <tr>
  //                   <td>${products[i].id}</td>
  //                   <td>${products[i].name}</td>
  //                   <td><img src="${products[i].image}"></td>
  //                   <td>${formatMoney(products[i].price)}</td>
  //                   <td>${products[i].price}</td>
  //                   <td>${products[i].quantity}</td>
  //                   <td>${products[i].category}</td>
  //                   <td>${products[i].description}</td>
  //                   <td>${products[i].status ? "active" : "block"}</td>
  //                   <td>
  //                     <button id="edit" class="btn">edit</button>
  //                     <button class="btn" onclick = "changeStatus(${
  //                       products[i].id
  //                     })">${products[i].status ? "block" : "active"}</button>
  //                     </button>
  //                     <button id="remove" class="btn">delete</button>
  //                   </td>
  //                 </tr>

  //   `;
  // }
  // tableProduct.innerHTML = stringProducts;
  renderPaginations(realProducts);
  renderProducts(realProducts);
}
render();

// ẩn đi khỏi danh sách người dùng

function changeStatus(id) {
  const products = JSON.parse(localStorage.getItem("products"));
  let indexId = products.findIndex((item) => item.id === id);
  products[indexId].status = !products[indexId].status;
  localStorage.setItem("products", JSON.stringify(products));
  render();
}

//xem số page của trang quá page == 5
function renderPaginations(products) {
  totalPage = Math.ceil(products.length / pageSize); //làm trên lên
  console.log(totalPage);
  let stringHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    if (currentPage === i) {
      stringHTML += `
            <span class="page-item page-active" onclick="clickPage(${i})">${i}</span>
            `;
    } else {
      stringHTML += `
            <span class="page-item " onclick="clickPage(${i})">${i}</span>
            `;
    }
  }
  pageList.innerHTML = stringHTML;
}

//B11 hiển thị sản phẩm sang trang
function renderProducts(products) {
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  if (end > products.length) {
    end = products.length;
  }
  let stringProducts = ``;

  for (let i = start; i < end; i++) {
    stringProducts += `
                  <tr>
                    <td>${products[i].id}</td>
                    <td>${products[i].name}</td>
                    <td><img src="${products[i].image}"></td>
                    <td>${products[i].size}</td>
                    <td>${formatMoney(products[i].price)}</td>
                    <td>${products[i].quantity}</td>
                    <td>

                      ${products[i].category}

                    </td>
                    <td>${products[i].description}</td>
                    <td>${products[i].status ? "active" : "block"}</td>
                    <td>
                      <button id="edit" class="btn" onclick ="initUpdate(${
                        products[i].id
                      })">edit</button>
                      <button class="btn" onclick = "changeStatus(${
                        products[i].id
                      })">${products[i].status ? "block" : "active"}</button>
                      </button>
                      <button id="remove" class="btn" onclick = "productsDelete(${
                        products[i].id
                      })">delete</button>
                    </td>
                  </tr>
    
    `;
  }
  tableProduct.innerHTML = stringProducts;
}
//  nhảy trang khi click
function clickPage(i) {
  currentPage = i;
  render();
}
// nhấn trái phải nút button
function changePage(status) {
  if (status === -1 && currentPage > 1) {
    currentPage -= 1;
  }
  if (status === 1 && currentPage < totalPage) {
    currentPage += 1;
  }
  render();
}
// tăng số lượng product của 1 trang
function changePageSize(e) {
  pageSize = e.target.value;
  currentPage = 1;
  render();
}
// search a product by category name

searchIcon.addEventListener("click", (e) => {
  e.preventDefault();
  let products = JSON.parse(localStorage.getItem("products"));
  const textSearch = document.getElementById("text-search").value.toLowerCase();
  const categoryFilter = products.filter((item) =>
    item.name.toLowerCase().includes(textSearch)
  );
  render(categoryFilter);
  e.target.reset();
});
// render categorys

function renderCategorys() {
  const categorysData = JSON.parse(localStorage.getItem("categorys"));
  console.log(categorysData);
  let stringCategorys = ``;
  for (let i = 0; i < categorysData.length; i++) {
    console.log(categorysData[i].status);
    if (categorysData[i].status == true) {
      stringCategorys += `
      <option value="${categorysData[i].id}">${categorysData[i].name}</option>
      `;
    }
  }
  category.innerHTML = stringCategorys;
}
renderCategorys();
//====== before update the data to the form =====

function initUpdate(id) {
  let products = JSON.parse(localStorage.getItem("products"));

  let index = products.findIndex((item) => item.id === id);
  console.log(index);

  productId.value = id;
  productName.value = products[index].name;
  productImage.src = products[index].image;
  img.src = products[index].image;
  productQuantity.value = products[index].quantity;
  category.value = products[index].category;
  productDescription.value = products[index].description;
  productSize.value = products[index].size;
  productPrice.value = products[index].price;

  action = "update";
  btnSubmit.innerText = "Update";
  formProductsOpen.classList.add("active");
}

// function delete

function productsDelete(id) {
  const products = JSON.parse(localStorage.getItem("products"));
  console.log(products);
  let indexId = products.findIndex((item) => item.id === id);
  products.splice(indexId, 1);
  localStorage.setItem("products", JSON.stringify(products));
  render();
}

//sigs out admin

document.getElementById("account-user").addEventListener("click", () => {
  document.getElementById("sigout").classList.toggle("open");
});

document.getElementById("btn-logout").addEventListener("click", () => {
  document.getElementById("sigout").classList.remove("open");
  document.getElementById("sigout-complete").style.right = "0px";
});

function CloseSignOut() {
  document.getElementById("sigout-complete").style.display = "none";
  document.getElementById("account-user").style.display = "none";
  document.getElementById("list-login").classList.add("open");
  window.location.href = "/user/index.html";
}
