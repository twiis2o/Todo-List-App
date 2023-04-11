let input = document.querySelector(".input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

let arr = [];

// Check for stored tasks
if(localStorage.getItem("tasks")) {
  arr=JSON.parse(localStorage.getItem("tasks"));
}
// Get Local Storage Data
getLocalData();

// Add Task 
add.onclick = ()=> {
  if(input.value !== "") {
    arrayOfTasks(input.value);
    input.value="";
  }
}

function arrayOfTasks(newTask) {
  const task = {
    id:Date.now(),
    title:newTask,
    completed:false
  }
  arr.push(task);
  addTasks(arr);
  addTasksToLocal(arr);
}

function addTasks(taskArry) {
  tasks.innerHTML="";
  taskArry.forEach((task)=> { 
    let div = document.createElement("div");
    div.className="task";
    if(task.completed) {
      div.className="task done"
    }
    div.appendChild(document.createTextNode(task.title));
    // Create Attribute for the id
    div.setAttribute("data-id",task.id);
    let del = document.createElement("span");
    del.className="del";
    del.appendChild(document.createTextNode("Delete"));
    div.appendChild(del);
    tasks.appendChild(div);
  })
}

function addTasksToLocal(taskArry) {
  localStorage.setItem("tasks",JSON.stringify(taskArry));
}

function getLocalData() {
  let arryData = JSON.parse(localStorage.getItem("tasks"));
  addTasks(arryData);
}

tasks.addEventListener("click",(e)=> {
  if(e.target.classList.contains("del")) {
    // Remove task from Local Storage
    deleteTaskLocal(e.target.parentElement.getAttribute("data-id"));
    // Remove Element from page
    e.target.parentElement.remove();
  }
  if(e.target.classList.contains("task")) {
    // Toggle completed for the task
    updateTask(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done")
  }
})

function deleteTaskLocal(taskId) {
  arr = arr.filter((task)=> {
  return task.id != taskId;
 })
 addTasksToLocal(arr);
}

function updateTask(taskId) {
  for(let i = 0 ; i<arr.length ; i++) {
    if(arr[i].id==taskId) {
      arr[i].completed == false ? arr[i].completed = true : arr[i].completed = false;
    }
  }
  addTasksToLocal(arr);
}