const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const filterSelect = document.getElementById("filter-select");
const clearBtn = document.getElementById("clear-completed");

form.addEventListener("submit", event => {
	event.preventDefault();
	if(input.value === "") return;
	const nuevaTarea = crearTarea(input.value);
	list.appendChild(nuevaTarea);
	input.value = "";
});

//Filtrar la opcion seleccionada
filterSelect.addEventListener("change", event => {
	const filterValue = event.target.value;
	filterTasks(filterValue);
});

//Boton para limpiar tareas completadas
clearBtn.addEventListener("click", event => {
	clearCompletedTasks();
});

//Funcion para crear una nueva tarea
function crearTarea(tarea){
	const nuevaTarea = document.createElement("li");
	nuevaTarea.innerHTML =`<label class="flex items-center">
			<input type="checkbox" class="completed form-checkbox h-4 w-4 mr-4">
			<span class="task-text font-medium text-lg">${tarea}</span>
		</label>
		<button class="edit-btn bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 ml-auto mr-2">Editar</button>
		<button class="delete-btn bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">Borrar</button>`;
		nuevaTarea.classList.add("py-2", "border-b", "border-gray-300", "flex", "items-center", "mt-8");
	const checkbox = nuevaTarea.querySelector(".completed");
	checkbox.addEventListener("change", event => {
		if(event.target.checked){
			nuevaTarea.classList.add(".completed-task");
		} else {
			nuevaTarea.classList.remove(".completed-task");
		}
	});

	const editBtn = nuevaTarea.querySelector(".edit-btn");
	editBtn.addEventListener("click", event => {
		const taskText = nuevaTarea.querySelector(".task-text");
		const input = document.createElement("input");
		input.type = "text";
		input.value = taskText.textContent;
		nuevaTarea.replaceChild(input, taskText);
		input.focus();
		input.addEventListener("blur", event => {
			taskText.textContent = input.value;
			nuevaTarea.replaceChild(taskText, input);
		});
	});

	const deleteBtn = nuevaTarea.querySelector(".delete-btn");
	deleteBtn.addEventListener("click", event => {
		list.removeChild(nuevaTarea);
	});

	return nuevaTarea;
}

//Filtramos las tareas dependiendo de la opcion seleccionada
function filterTasks(filterValue){
	const tasks = Array.from(list.children);
	tasks.forEach(task => {
		if(filterValue === "all") {
			task.style.display = "block";
		} else if (filterValue === "completed"){
			if(task.querySelector(".completed-task").checked){
				task.style.display = "block";
			} else {
				task.style.display = "none";
			}
		} else {
			if(!task.querySelector(".completed-task").checked){
				task.style.display = "none";
			} else {
				task.style.display = "block";
			}
		}
	});
}

//Limpiamos las tareas completadas
function clearCompletedTasks(){
	const tasks = Array.from(list.children);
	tasks.forEach(task => {
		if(task.querySelector(".completed-task").checked){
			list.removeChild("task");
		}
	});
}

//Guardamos las tareas en localStorage
function saveTasks(){
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Cargamos las tareas 
function loadTasks(){
	const storedTasks = JSON.parse(localStorage.getItem("tasks"));
	if(storedTasks !== null){
		storedTasks.forEach(task => {
			createTask(task);
		});
	}
}

//Escucha del form cuando agregamos una tarea nueva
form.addEventListener("submit", addTask);

//Escucha del select cuando filtramos una tarea
filterSelect.addEventListener("change", filterTasks);

//Escucha cuando hacemos click en el boton de limpiar tarea
clearBtn.addEventListener("click", clearCompletedTasks);

//Cargamos las tareas desde el localStorage
loadTasks();

//Guardamos las tareas en el localStorage
window.addEventListener("beforeunload", saveTasks);

//Drag and drop
/*const tasks = Array.from(list.children);

function handleDrag(event){
	event.dataTransfer.setData("text", event.target.id);
}

function handleDrop(event){
	event.preventDefault();
	const data = event.dataTransfer.getData("text");
	const dragElement = document.getElementById(data);
	const target = event.target;
	if(target.tagName === "li"){
		list.insertBefore(dragElement,target);
	}
}

function handleDragOver(evet){
	event.preventDefault();
}

tasks.forEach(task => {
	task.setAttribute("draggable", true);

	task.addEventListener("dragstart", handleDrag);
	task.addEventListener("dragover", handleDragOver);
	task.addEventListener("drop", handleDrop);
});*/
