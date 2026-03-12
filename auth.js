
let pwd = document.getElementById('pwd');

let changeIcon = document.getElementById('icon');

function reveal() {
    const isHidden = pwd.type === "password";
    pwd.type = isHidden ? "text" : "password";

    changeIcon.classList.toggle("bi-eye");
    changeIcon.classList.toggle("bi-eye-slash");
}

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.querySelector(".loginMessage");

/* SIGN UP */
if(registerForm){
    registerForm.addEventListener("submit", function(e){

        e.preventDefault();

        const username = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("pwd").value;

        const user = { username, email, password };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Account created!");

        window.location.href = "login.html";

    });
}

/* LOGIN */
if(loginForm){
    loginForm.addEventListener("submit", function(e){

        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("pwd").value;

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if(email === storedUser.email && password === storedUser.password){

            localStorage.setItem("loggedInUser", JSON.stringify(storedUser));

            loginMessage.textContent = `😊 Welcome back, ${storedUser.username}!`;
            loginMessage.style.color = "green";
            loginMessage.style.fontWeight = "bold";
            loginMessage.style.marginTop = "10px";
            loginMessage.style.backgroundColor = "rgba(0, 128, 0, 0.247)";
            loginMessage.style.border = "1px solid rgba(0, 128, 0, 0.158)";

            // Disable the login button to prevent multiple clicks
            loginForm.querySelector("button").disabled = true;

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 2000);

        }else {
            // show error message
            loginMessage.textContent = "⚠️ Invalid login credentials";
            loginMessage.style.color = "rgba(255, 0, 0, 0.904)";
            loginMessage.style.fontWeight = "bold";
            loginMessage.style.backgroundColor = "rgba(255, 0, 0, 0.192)";
            loginMessage.style.border = "1px solid rgba(255, 0, 0, 0.137)";
            loginForm.querySelector("button").disabled = false;

        }
    });
}

const logoutBtn = document.querySelector(".logoutBtn");

if(logoutBtn){
    logoutBtn.addEventListener("click", function(){

        localStorage.removeItem("loggedInUser");

        window.location.href = "index.html";

    });
}






