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

const addProducts = document.getElementById("add-products");
const formOpen = document.querySelector(".form-product");
const closeForm = document.getElementById("close-form");

addProducts.addEventListener("click", () => {
  formOpen.classList.add("active");
});
closeForm.addEventListener("click", () => {
  formOpen.classList.remove("active");
});

// ======== C/R/U/D==============

// -----------Initialize the variable and get the value in the html----------

const btnAdd = document.getElementById("btn-add");
const categoryName = document.getElementById("name");
const errorName = document.getElementById("error-name");
const tableBody = document.getElementById("tbody");
const btnCancel = document.getElementById("btn-cancel");
const btnSubmit = document.getElementById("btn-submit");
const btnEdit = document.getElementById("edit");
const showId = document.getElementById("showId");
const searchIcon = document.getElementById("search-icon");
const pageList = document.getElementById("page-list");

//  ===========Initialize the variable can be reassigned let============

// Initialize the variable show page

let pageSize = 5;
let totalPage = 1;
let currentPage = 1;

// Initialize the variable search
let textSearch = "";

let action = "add";

// create function submitForm

function submitForm(e) {
  e.preventDefault();
  let id = 1;
  const categorys = JSON.parse(localStorage.getItem("categorys")) || [];

  if (checkName(categorys)) {
    if (action === "add") {
      if (categorys.length > 0) {
        id = categorys[categorys.length - 1].id + 1;
      }
      //  create a new category
      const category = {
        id,
        name: categoryName.value,
        status: true,
      };

      categorys.push(category);

      localStorage.setItem("categorys", JSON.stringify(categorys));
      e.target.reset();
      render();
    } else {
      const indexUpdate = categorys.findIndex(
        (index) => index.id == showId.value
      );
      categorys[indexUpdate].name = categoryName.value;
      localStorage.setItem("categorys", JSON.stringify(categorys));
      action = "add";
      btnSubmit.innerText = "Add";
      e.target.reset();
      render();
    }
  }
}

// initialization function render show data on the table

function render(data) {
  // data of function search
  let categorysPage = JSON.parse(localStorage.getItem("categorys")) || [];
  // let categorys = JSON.parse(localStorage.getItem("categorys")) || [];
  if (Array.isArray(data)) {
    categorysPage = data;
  }
  //   for (let i = 0; i < categorys.length; i++) {
  //     stringHTML += `
  //               <tr>
  //                 <td>${categorys[i].id}</td>
  //                 <td>${categorys[i].name}</td>
  //                 <td>${categorys[i].status ? "active" : "block"}</td>
  //                 <td>
  //                   <button id="edit" onclick = "initUpdate(${
  //                     categorys[i].id
  //                   })"class="btn">edit</button>
  //                   <button id="remove" onclick = "changeStatus(${
  //                     categorys[i].id
  //                   })" class="btn">${
  //       categorys[i].status ? "block" : "active"
  //     }</button>
  //                   <button id="remove" onclick = "deleteEl(${
  //                     categorys[i].id
  //                   })" class="btn">delete</button>
  //                 </td>
  //               </tr>
  //     `;
  //   }
  //   tableBody.innerHTML = stringHTML;
  renderPaginations(categorysPage);
  renderProducts(categorysPage);
}
render();

// initialization function  check name when user input in the  form

function checkName(check) {
  const flag = true;
  // name is valid?
  if (categoryName.value.length < 2) {
    errorName.innerText = "Invalid name,Please re-enter name.";
    flag = false;
  }
  // name is duplicated?
  const index = check.findIndex((index) => index.name === categoryName.value);

  if (index !== -1) {
    errorName.innerText = "name is duplicated, please re-enter name.";
    flag = false;
  }
  if (flag) {
    errorName.innerText = "";
  }
  return flag;
}

//   close form
function closeFrom() {
  formOpen.classList.remove("active");
}

//====== before update the data to the form =====

function initUpdate(id) {
  let categorys = JSON.parse(localStorage.getItem("categorys"));

  let indexId = categorys.findIndex((item) => item.id === id);

  categoryName.value = categorys[indexId].name;
  showId.value = id;
  action = "update";
  btnSubmit.innerText = "Update";
  formOpen.classList.add("active");
}

// delete element in the array of categorys
function deleteEl(id) {
  let categorys = JSON.parse(localStorage.getItem("categorys"));
  let indexId = categorys.findIndex((item) => item.id === id);
  categorys.splice(indexId, 1);
  localStorage.setItem("categorys", JSON.stringify(categorys));
  render();
}

// change status of product in the categorys

function changeStatus(id) {
  let categorys = JSON.parse(localStorage.getItem("categorys"));
  let indexId = categorys.findIndex((item) => item.id === id);
  categorys[indexId].status = !categorys[indexId].status;
  localStorage.setItem("categorys", JSON.stringify(categorys));
  render();
}

// search a product by category name

searchIcon.addEventListener("click", (e) => {
  e.preventDefault();
  let categorys = JSON.parse(localStorage.getItem("categorys"));
  const textSearch = document.getElementById("text-search").value.toLowerCase();
  const categoryFilter = categorys.filter((item) =>
    item.name.toLowerCase().includes(textSearch)
  );
  render(categoryFilter);
  e.target.reset();
});

//  show page
// xem số page của trang quá page == 5

function renderPaginations(categorys) {
  totalPage = Math.ceil(categorys.length / pageSize); //làm trên lên
  // console.log(totalPage);
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
function renderProducts(categorys) {
  let stringHTML = "";
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  if (end > categorys.length) {
    end = categorys.length;
  }
  for (let i = start; i < end; i++) {
    stringHTML += `
        <tr>
          <td>${categorys[i].id}</td>
          <td>${categorys[i].name}</td>
          <td>${categorys[i].status ? "active" : "block"}</td>
          <td>
            <button id="edit" onclick = "initUpdate(${
              categorys[i].id
            })"class="btn">edit</button>
            <button id="remove" onclick = "changeStatus(${
              categorys[i].id
            })" class="btn">${categorys[i].status ? "block" : "active"}</button>
            <button id="remove" onclick = "deleteEl(${
              categorys[i].id
            })" class="btn">delete</button>
          </td>
        </tr>
`;
  }
  tableBody.innerHTML = stringHTML;
}
//B12 nhảy trang khi click
function clickPage(i) {
  currentPage = i;
  render();
}

//B13 nhấn trái phải nút button
function changePage(status) {
  if (status === -1 && currentPage > 1) {
    currentPage -= 1;
  }
  if (status === 1 && currentPage < totalPage) {
    currentPage += 1;
  }
  render();
}
//B14 tăng số lượng product của 1 trang
function changePageSize(e) {
  pageSize = e.target.value;
  currentPage = 1;
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
