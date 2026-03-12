const loggedInUser = localStorage.getItem("loggedInUser");
const storedUser = JSON.parse(localStorage.getItem("user"));

if(!loggedInUser){
    window.location.href = "login.html";
}

// getting the time of the day

const greeting = document.querySelector(".dashboard h2");

const hour = new Date().getHours();

let greet = "Good evening";

if(hour < 12){
    greet = "Good morning";
}
else if(hour < 17){
    greet = "Good afternoon";
}

// displaying the name with greeting on the dashboard.
if(storedUser){
    const username = storedUser.username;

    // Display greeting
    greeting.innerHTML = `${greet}, <span class="name">${username} 👋</span>`;

    // Display username in profile section
    document.querySelector(".profileCon h3").textContent = username;

    // Display first letter in the circle
    const circle = document.querySelector(".circle");
    circle.textContent = username.charAt(0).toUpperCase();
}

function toggle(){
    const background = document.querySelector('.content');
    const header = document.querySelector(".header")
    const card = document.querySelector(".card");
    const inputField = document.querySelector(".input-field");
    const button = document.querySelector(".taskAdder button");
    background.classList.toggle("dark");
    header.classList.toggle("dark");
    card.classList.toggle("dark");
    inputField.classList.toggle("dark");
    button.classList.toggle("dark");
}
