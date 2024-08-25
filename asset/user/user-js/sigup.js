// show sign up

const userClose = document.querySelector(".close-box");
const user = document.querySelector(".user");
const userOpen = document.querySelector("#user-icon");

// show login
const userLogin = document.querySelector("#user-login");
const loginOpen = document.querySelector(".login");
const loginBox = document.querySelector(".login-box");
const nameLogin = document.getElementById("name-login");

// show login = > sign in
const signIn = document.querySelector("#sign-open");

// ket noi voi cac o input
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email-user");
const passwordInput = document.getElementById("password-user");
const passwordConfirmInput = document.getElementById("password-confirm");

// ket noi cac thong bao loi
const nameError = document.getElementById("error-name");
const emailError = document.getElementById("error-email");
const passwordError = document.getElementById("error-password");
const passwordConfirmError = document.getElementById("error-password-confirm");

// show sig out
const sigOut = document.getElementById("sigout");
const accountUser = document.getElementById("account-user");
const btnLogout = document.getElementById("btn-logout");

const regexEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

userOpen.addEventListener("click", () => {
  user.classList.add("active");
});
userClose.addEventListener("click", () => {
  user.classList.remove("active");
});

userLogin.addEventListener("click", () => {
  loginOpen.classList.add("active");
  user.classList.remove("active");
});
loginBox.addEventListener("click", () => {
  loginOpen.classList.remove("active");
});

signIn.addEventListener("click", () => {
  user.classList.add("active");
  loginOpen.classList.remove("active");
});

// show eye
const hideEye = document.querySelectorAll(".eye-icon");
hideEye.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    let fields =
      eyeIcon.parentElement.parentElement.querySelectorAll(".password");
    fields.forEach((passwords) => {
      if (passwords.type == "password") {
        passwords.type = "text";
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
        return;
      }
      passwords.type = "password";
      eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    });
  });
});

// them cac su kien cho cac o input name

nameInput.addEventListener("click", function () {
  nameError.innerHTML = "";
});
nameInput.addEventListener("change", function () {
  if (nameInput.value.length < 2) {
    nameError.innerHTML = "ten phai co hai ki tu";
  } else {
    nameError.innerHTML = "";
  }
});
// them cac su kien cho cac o input email

emailInput.addEventListener("click", function () {
  emailError.innerHTML = "";
});
emailInput.addEventListener("change", function () {
  if (!regexEmail.test(emailInput.value)) {
    emailError.innerHTML = "email phai hop le";
  } else {
    emailError.innerHTML = "";
  }
});

// them cac su kien cho cac o input password

passwordInput.addEventListener("click", function () {
  passwordError.innerHTML = "";
});

passwordInput.addEventListener("change", function () {
  if (passwordInput.value.length < 8) {
    passwordError.innerHTML = "ten phai co hai ki tu";
  } else {
    passwordError.innerHTML = "";
  }
});

passwordConfirmInput.addEventListener("click", function () {
  passwordConfirmError.innerHTML = "";
});
passwordConfirmInput.addEventListener("change", function () {
  if (passwordConfirmInput.value !== passwordInput.value) {
    passwordConfirmError.innerHTML = "xac nhan lai mat khau";
  } else {
    passwordConfirmError.innerHTML = "";
  }
});

function register(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const values = {};

  // entries tra ra tat ca cac name va value
  for (let [name, value] of formData.entries()) {
    values[name] = value;
    console.log(values);
  }

  let check = true;

  if (values.username.length < 2) {
    nameError.innerHTML = "ten co phai co it nhat 2 ky tu";
    check = false;
  }

  if (!regexEmail.test(values.email)) {
    emailError.innerHTML = "email phai hop le";
    check = false;
  }
  if (values.password.length < 8) {
    passwordError.innerHTML = "mat khau phai co tren 8 ki tu";
    check = false;
  }
  if (values.confirmPassword !== values.password) {
    passwordConfirmError.innerHTML = "xac nhan lai mat khau";
    check = false;
  }

  if (!check) {
    return;
  }

  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  const findAccount = accounts.find(
    (accounts) => accounts.email === values.email
  );
  if (!findAccount) {
    // phan biet tai khoan admin hay la user

    values.id = accounts.length > 0 ? accounts[accounts.length - 1].id + 1 : 1;
    values.status = true;
    values.role = "user";
    accounts.push(values);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    document.getElementById("register-complete").style.right = "100px";

    setTimeout(() => {
      document.getElementById("register-complete").style.right = "-100%";
      e.target.reset();
      user.classList.remove("active");
      loginOpen.classList.add("active");
    }, 2000);
  } else {
    emailError.innerHTML = "email ton tai";
    emailInput.addEventListener("click", function () {
      emailError.innerHTML = "";
    });
    emailInput.addEventListener("change", function () {
      if (accounts.email == emailInput.value) {
        emailError.innerHTML = "email ton tai";
      } else {
        emailError.innerHTML = "";
      }
    });
  }
}

// kiem tra phan login khi khoi tao x

document.getElementById("btn-login").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("abc");
  checkLogin();
  let emailLogin = document.getElementById("emailLogin").value;

  let passwordLogin = document.getElementById("passwordLogin").value;

  console.log(emailLogin);

  let accountsLogin = JSON.parse(localStorage.getItem("accounts")) || [];
  console.log(accountsLogin);

  let flag = true;

  for (let i = 0; i < accountsLogin.length; i++) {
    if (
      emailLogin == accountsLogin[i].email &&
      passwordLogin == accountsLogin[i].password
    ) {
      if (accountsLogin[i].role == "admin") {
        flag = true;
        window.location.href = "../admin/user.html";
        break;
      } else {
        if (accountsLogin[i].status == true) {
          localStorage.setItem(
            "accountsLogin",
            JSON.stringify(accountsLogin[i])
          );
          flag = true;
          loginOpen.classList.remove("active");
          window.location.reload();
          break;
        } else {
          flag = true;
          alert("tai khoan ban da bi khoa");
          break;
        }
      }
    } else {
      flag = false;
    }
  }
  if (flag == false) {
    alert("tai khoan k tim thay");
  }
});

//
function checkLogin() {
  let userLogin = JSON.parse(localStorage.getItem("accountsLogin")) || [];
  if (userLogin.email && userLogin.password) {
    // console.log("co");
    nameLogin.innerHTML = "<span></span>";
    loginOpen.classList.remove("active");
    document.getElementById("list-login").style.display = "none";
    document.getElementById("account-user").classList.add("open");
  } else {
    // console.log("kho");
    nameLogin.innerHTML = "";
    document.getElementById("list-login").style.display = "block";
    document.getElementById("account-user").classList.remove("open");
  }
}
checkLogin();

// open sig out
accountUser.addEventListener("click", (e) => {
  e.preventDefault();
  sigOut.classList.toggle("open");
  renderSigOut();
});
// render on the sigout
function renderSigOut() {
  const sigOutUser = JSON.parse(localStorage.getItem("accountsLogin"));
  let stringAccountsLogin = ``;

  stringAccountsLogin += `
    <p>${sigOutUser.email}</p>
        <h3>Hi,${sigOutUser.username}</h3>
        <div class="sigout-btn">
          <button class="" id="btn-add" type="button" onclick ="openAccount()">
            <i class="bx bxs-plus-circle"></i>
            <p>Add account</p>
          </button>
          <button type="button" class=""id= "btn-logout2" onclick ="removeLogin()">
            <i class="bx bx-log-in-circle"></i>
            <p>Sig out</p>
          </button>
        </div>
    `;
  sigOut.innerHTML = stringAccountsLogin;
}
renderSigOut();

function removeLogin() {
  sigOut.classList.remove("open");
  document.getElementById("sigout-complete").style.right = "0px";
}
function openAccount() {
  user.classList.add("active");
}
document.getElementById("btn-yes").addEventListener("click", () => {
  checkLogin();
  document.getElementById("list-login").style.display = "block";
  document.getElementById("account-user").classList.remove("open");
  document.getElementById("sigout-complete").style.right = "-100%";
  nameLogin.innerHTML = "";
});
document.getElementById("btn-no").addEventListener("click", () => {
  checkLogin();
  localStorage.removeItem("accountsLogin");
  document.getElementById("list-login").style.display = "none";
  document.getElementById("account-user").classList.add("open");
  document.getElementById("sigout-complete").style.right = "-100%";
});
