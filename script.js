let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value;

  if (text === "") return;

  tasks.push({ text, completed: false });
  input.value = "";
  save();
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  save();
  render();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  save();
  render();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText !== "") {
    tasks[index].text = newText;
    save();
    render();
  }
}

function setFilter(type) {
  filter = type;
  render();
}

function render() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks
    .filter(task => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      if (task.completed) li.classList.add("completed");

      li.innerHTML = `
        <div class="task-left">
          <input type="checkbox" ${task.completed ? "checked" : ""} 
            onclick="toggleComplete(${index})">
          <span>${task.text}</span>
        </div>

        <div class="actions">
          <button class="edit" onclick="editTask(${index})">✏️</button>
          <button class="delete" onclick="deleteTask(${index})">❌</button>
        </div>
      `;

      list.appendChild(li);
    });
}

function toggleMode() {
  document.body.classList.toggle("light");
}

render();