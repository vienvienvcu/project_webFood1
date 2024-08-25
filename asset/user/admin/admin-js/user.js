// const data = [
//   {
//     id: 1,
//     email: "admin@gmail.com",
//     password: "admin123",
//     status: true,
//     name: "Admin",
//     role: "admin",
//   },
// ];
// localStorage.setItem("accounts", JSON.stringify(data));

// -----------Initialize the variable and get the value in the html----------

// -- Initialize the variable show sidebar
const navToggle = document.querySelector(".nav-toggler");
const sidebarAdmin = document.querySelector(".sidebar-admin");
const mainActive = document.querySelector(".main");

// Initialize the variable show search
const searchIcon = document.getElementById("search-icon");
const searchOpen = document.getElementById("#text-search");

// Initialize the variable renderAccount user on the table
const tableAdminUser = document.getElementById("table-admin-user");

// Initialize the variable show page
const pageList = document.getElementById("page-list");
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;

// Initialize the variable search
let textSearch = "";

// Initialize the variable sort
let sortname = "All";

navToggle.addEventListener("click", () => {
  sidebarAdmin.classList.toggle("active");
  mainActive.classList.toggle("active");
  navToggle.classList.toggle("transition");
});

// render users on the table

function renderAccount(data) {
  let userPage = JSON.parse(localStorage.getItem("accounts")) || [];

  // check data of search
  if (Array.isArray(data)) {
    userPage = data;
  }
  // sort name

  if (sortname !== "All" && sortname == "x") {
    userPage = userPage.sort((a, b) =>
      a.username < b.username ? -1 : a.username < b.username ? 1 : 0
    );
  } else if (sortname !== "All" && sortname == "y") {
    userPage = userPage.sort((a, b) =>
      a.username > b.username ? -1 : a.username > b.username ? 1 : 0
    );
  }
  console.log(userPage);

  // const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  // console.log(accounts);

  // let stringAdmin = ``;

  // for (let i = 0; i < accounts.length; i++) {
  //   stringAdmin += `
  //    <tr>
  //   <td>${accounts[i].id}</td>
  //   <td>${accounts[i].username}</td>
  //   <td>${accounts[i].email}</td>
  //   <td>${accounts[i].status ? "active" : "block"}</td>
  //   <td>
  //     <button id="edit" class="btn" onclick = "changeStatus(${
  //       accounts[i].id
  //     })">${
  //     accounts[i].status
  //       ? "<i class='bx bxs-like' ></i>"
  //       : "<i class='bx bxs-dislike'></i>"
  //   }</button>
  //   </td>
  // </tr>
  //   `;
  // }
  // tableAdminUser.innerHTML = stringAdmin;
  renderPaginations(userPage);
  renderProducts(userPage);
}
renderAccount();

// Change the status of whether the user is log in

function changeStatus(id) {
  const statusAdmin = JSON.parse(localStorage.getItem("accounts"));
  const indexId = statusAdmin.findIndex((item) => item.id == id);
  statusAdmin[indexId].status = !statusAdmin[indexId].status;
  localStorage.setItem("accounts", JSON.stringify(statusAdmin));
  console.log(statusAdmin[indexId].status);
  renderAccount();
}

//  show page
// xem số page của trang quá page == 5

function renderPaginations(accounts) {
  totalPage = Math.ceil(accounts.length / pageSize); //làm trên lên
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
function renderProducts(accounts) {
  let stringAdmin = ``;
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  if (end > accounts.length) {
    end = accounts.length;
  }

  for (let i = start; i < end; i++) {
    if (accounts[i].email === "admin@gmail.com") {
      stringAdmin += `
      <tr>
       <td>${accounts[i].id}</td>
       <td>${accounts[i].username}</td>
       <td>${accounts[i].email}</td>
       <td>${accounts[i].status}</td>
       <td>
       </td>
     </tr> `;
    } else {
      stringAdmin += `
      <tr>
       <td>${accounts[i].id}</td>
       <td>${accounts[i].username}</td>
       <td>${accounts[i].email}</td>
       <td>${accounts[i].status ? "active" : "block"}</td>
       <td>
         <button id="edit" class="btn" onclick = "changeStatus(${
           accounts[i].id
         })">${
        accounts[i].status
          ? "<i class='bx bxs-like' ></i>"
          : "<i class='bx bxs-dislike'></i>"
      }</button>
       </td>
     </tr> `;
    }
  }
  tableAdminUser.innerHTML = stringAdmin;
}
//B12 nhảy trang khi click
function clickPage(i) {
  currentPage = i;
  renderAccount();
}

//B13 nhấn trái phải nút button
function changePage(status) {
  if (status === -1 && currentPage > 1) {
    currentPage -= 1;
  }
  if (status === 1 && currentPage < totalPage) {
    currentPage += 1;
  }
  renderAccount();
}
//B14 tăng số lượng product của 1 trang
function changePageSize(e) {
  pageSize = e.target.value;
  currentPage = 1;
  renderAccount();
}

searchIcon.addEventListener("click", (e) => {
  e.preventDefault();
  let accounts = JSON.parse(localStorage.getItem("accounts"));
  const textSearch = document.getElementById("text-search").value.toLowerCase();
  const accountsFilter = accounts.filter((item) =>
    item.email.toLowerCase().includes(textSearch)
  );
  renderAccount(accountsFilter);
});

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

// sort name

function sortName(event) {
  sortname = event.target.value;
  currentPage = 1;
  renderAccount();
}
