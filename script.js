// Предопределенные пользователи
const users = {
    "pidor1488": { password: "1488", name: "ТИМОФЕЙгой", gender: "Определен как гендерно нейтральный бо синн" },
    "r": { password: "3586", name: "Reygar", gender: "Не определенный" },
};

// Вход
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (users[username] && users[username].password === password) {
        localStorage.setItem("currentUser", username);
        localStorage.setItem("userName", users[username].name);
        localStorage.setItem("userGender", users[username].gender);
        alert("Вы успешно вошли!");
        document.getElementById("login-form").style.display = "none";
        document.getElementById("account-info").style.display = "block";
        loadAccountInfo();
    } else {
        alert("Неправильный логин или пароль.");
    }
}

// Продолжить как гость
function continueAsGuest() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userName");
    localStorage.removeItem("userGender");
    document.getElementById("login-form").style.display = "none";
    document.getElementById("account-info").style.display = "block";
    displayUserInfo("Гость", "—");
}

// Загрузка информации о пользователе
function loadAccountInfo() {
    const name = localStorage.getItem("userName") || "—";
    const gender = localStorage.getItem("userGender") || "—";

    document.getElementById("username").value = name !== "—" ? name : "";
    document.getElementById("gender").value = gender !== "—" ? gender : "";
    displayUserInfo(name, gender);
}

// Сохранение информации об аккаунте
function saveAccountInfo() {
    const name = document.getElementById("username").value;
    const gender = document.getElementById("gender").value;

    localStorage.setItem("userName", name);
    localStorage.setItem("userGender", gender);

    const currentUser = localStorage.getItem("currentUser");
    if (currentUser && users[currentUser]) {
        users[currentUser].name = name;
        users[currentUser].gender = gender;
    }

    document.getElementById("status").innerText = "Данные сохранены!";
    displayUserInfo(name, gender);
}

// Функция для отображения информации о пользователе
function displayUserInfo(name, gender) {
    document.getElementById("display-username").innerText = name || "—";
    document.getElementById("display-gender").innerText = gender || "—";
}

// Выход из аккаунта
function logout() {
    localStorage.clear();
    document.getElementById("login-form").style.display = "block";
    document.getElementById("account-info").style.display = "none";
    alert("Вы вышли из аккаунта.");
}

// Проверка состояния аккаунта при загрузке страницы
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("currentUser") || localStorage.getItem("userName")) {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("account-info").style.display = "block";
        loadAccountInfo();
    }
});
