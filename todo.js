document.addEventListener("DOMContentLoaded", function () {

    const todoinput = document.getElementById("todoinput");
    const addtask = document.getElementById("addtaskbutton");
    const todolist = document.getElementById("todolist");

    let task = JSON.parse(localStorage.getItem("task")) || []; // Load tasks on page load

    renderAllTasks(); // First render of existing tasks

    addtask.addEventListener('click', function () {
        const tasktext = todoinput.value.trim();
        if (tasktext === "") return; // Prevent empty task

        const newtask = {
            id: Date.now(), // unique id
            text: tasktext,
            completed: false
        };

        task.push(newtask); // Add to array
        savetasks(); // Save to localStorage
        renderAllTasks(); // Show updated list
        todoinput.value = ""; // Clear input
    });

    // Function to render all tasks
    function renderAllTasks() {
        todolist.innerHTML = ""; // Clear old list
        task.forEach((t) => rendertask(t)); // Render each task
    }

    // Function to render a single task
    function rendertask(singleTask) {
        const li = document.createElement("li");
        li.setAttribute('data-id', singleTask.id);
        if (singleTask.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${singleTask.text}</span> 
            <button class="delete-btn">Delete</button>
        `;

        // Toggle complete on clicking task text
        li.querySelector('span').addEventListener("click", function () {
            singleTask.completed = !singleTask.completed;
            savetasks();
            renderAllTasks(); // Refresh list
        });

        // Delete on clicking delete button
        li.querySelector('.delete-btn').addEventListener("click", function (e) {
            e.stopPropagation(); // Prevent triggering toggle
            task = task.filter(t => t.id !== singleTask.id); // Remove from array
            savetasks();
            renderAllTasks(); // Refresh list
        });

        todolist.appendChild(li);
    }

    // Save tasks to localStorage
    function savetasks() {
        localStorage.setItem('task', JSON.stringify(task));
    }

});
