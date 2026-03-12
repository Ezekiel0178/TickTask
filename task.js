const currentUser = localStorage.getItem("loggedInUser");
let tasks = JSON.parse(localStorage.getItem(`${currentUser}_tasks`)) || [];

const input = document.querySelector(".input-field input");
const addBtn = document.querySelector(".taskAdder button");
const taskContainer = document.querySelector(".sub-content");
const tasksList = document.querySelector(".tasksList");

const dashboardText = document.querySelector(".dashboard p");

const totalTasksEl = document.querySelector(".number");
const completedTasksEl = document.querySelector(".number2");
const pendingTasksEl = document.querySelectorAll(".number")[2];

const progressBar = document.getElementById("progress");
const progressValue = document.querySelector(".value");

let draggedIndex = null;


// add tasks
function addTask(taskText){

    const task = {
        text: taskText,
        completed:false,
        date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"})
    };

    tasks.push(task);

    localStorage.setItem(`${currentUser}_tasks`, JSON.stringify(tasks));

    renderTasks();
}

function updateEmptyState(){

    const emptyMessage = document.querySelector(".emptyMessage");
    const progressDiv = document.querySelector(".progressBar");

    const tasksadded = document.querySelectorAll(".taskCon");

    if(tasksadded.length === 0){
        emptyMessage.classList.add("show");
        progressDiv.classList.remove("show");
    }else{
        emptyMessage.classList.remove("show");
        progressDiv.classList.add("show");
    }

}


// render tasks

function renderTasks(){

    tasksList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const taskHTML = `
        <div class="taskCon ${task.completed ? "completed":""}" draggable="true" data-index="${index}">
            <div class="circle" data-index="${index}">
                <i class="bi bi-check2 tick"></i>
            </div>

            <div class="task">
                <p class="text">${task.text}</p>
                <p class="date">${task.date}</p>
            </div>

            <div class="editCon edit" data-index="${index}">
                <i class="bi bi-pencil edit" data-index="${index}"></i>
            </div>

            <div class="deleteCon delete" data-index="${index}">
                <i class="bi bi-trash delete" data-index="${index}"></i>
            </div>
        </div>
        `;

        tasksList.insertAdjacentHTML("beforeend", taskHTML);

    });

    updateDashboard();
    updateEmptyState();
}

// update dashboard
function updateDashboard(){

    const total = tasks.length;

    const completed = tasks.filter(t=>t.completed).length;

    const pending = total - completed;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;

    if(total === 0){
        dashboardText.textContent = "Your task board is empty. Let's add something!";
    }
    else if(pending === 0){
        dashboardText.textContent = "All tasks completed! You're on fire! 🔥";
    }
    else{
        dashboardText.textContent = `${pending} task waiting for you today`;
    }

    const percent = total === 0 ? 0 : (completed / total) * 100;

    progressBar.value = percent;
    progressValue.textContent = `${Math.round(percent)}%`;

    progressBar.style.background =
    `linear-gradient(to right, blue ${percent}%, white ${percent}%)`;
}

// complete task

document.addEventListener("click",function(e){

    if(e.target.closest(".circle")){

        const index = e.target.closest(".circle").dataset.index;

        tasks[index].completed = !tasks[index].completed;

        localStorage.setItem(`${currentUser}_tasks`, JSON.stringify(tasks));

        renderTasks();
    }
});

// delete task
document.addEventListener("click",function(e){

    if(e.target.classList.contains("delete")){

        const index = e.target.dataset.index;

        if(confirm("Delete this task?")){

            tasks.splice(index,1);

            localStorage.setItem(`${currentUser}_tasks`, JSON.stringify(tasks));

            renderTasks();
        }
    }
});

// edit task
document.addEventListener("click",function(e){

    if(e.target.classList.contains("edit")){

        const index = e.target.dataset.index;

        let newText = prompt("Edit task:", tasks[index].text);

        if(newText){
            tasks[index].text = newText;
            localStorage.setItem(`${currentUser}_tasks`, JSON.stringify(tasks));
            renderTasks();
        }
    }
});

// add task button
addBtn.addEventListener("click",()=>{

    const value = input.value.trim();

    if(value === "") return;

    addTask(value);

    input.value="";
});

// add task with enter key
input.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        addBtn.click();
    }
});

// loads tasks when page opens
renderTasks();


document.addEventListener("dragstart", function(e){

    if(e.target.classList.contains("taskCon")){
        draggedIndex = e.target.dataset.index;
    }

});


document.addEventListener("dragover", function(e){

    if(e.target.closest(".taskCon")){
        e.preventDefault();
    }

});


document.addEventListener("drop", function(e){

    const targetTask = e.target.closest(".taskCon");

    if(targetTask){

        const targetIndex = targetTask.dataset.index;

        const draggedTask = tasks.splice(draggedIndex,1)[0];

        tasks.splice(targetIndex,0,draggedTask);

        localStorage.setItem(`${currentUser}_tasks`, JSON.stringify(tasks));

        renderTasks();
    }

});