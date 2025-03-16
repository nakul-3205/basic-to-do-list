document.addEventListener("DOMContentLoaded", function () {

    const todoinput = document.getElementById("todoinput");
    const addtask = document.getElementById("addtaskbutton");
    const todolist = document.getElementById("todolist");

    let task = JSON.parse(localStorage.getItem("task")) || []; 

    renderAllTasks(); 

    addtask.addEventListener('click', function () {
        const tasktext = todoinput.value.trim();
        if (tasktext === "") return; 

        const newtask = {
            id: Date.now(), 
            text: tasktext,
            completed: false
        };

        task.push(newtask); 
        savetasks();  
        renderAllTasks(); 
        todoinput.value = ""; 
    });

    function renderAllTasks() {
        todolist.innerHTML = ""; 
        task.forEach((t) => rendertask(t)); 
    }

    function rendertask(singleTask) {
        const li = document.createElement("li");
        li.setAttribute('data-id', singleTask.id);
        if (singleTask.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${singleTask.text}</span> 
            <button class="delete-btn">Delete</button>
        `;

        li.querySelector('span').addEventListener("click", function () {
            singleTask.completed = !singleTask.completed;
            savetasks();
            renderAllTasks();
        });

        li.querySelector('.delete-btn').addEventListener("click", function (e) {
            e.stopPropagation(); 
            task = task.filter(t => t.id !== singleTask.id); 
            savetasks();
            renderAllTasks(); 
        });

        todolist.appendChild(li);
    }

    function savetasks() {
        localStorage.setItem('task', JSON.stringify(task));
    }

});
