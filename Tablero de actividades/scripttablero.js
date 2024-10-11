let taskCounter = 1; // Contador para las nuevas tareas

function toggleEditMenu(menuId) {
    const menu = document.getElementById(menuId);
    menu.style.display = menu.style.display === "none" || menu.style.display === "" ? "block" : "none";
}

function saveChanges(id) {
    const projectName = document.getElementById(`projectName${id}`).value;
    const projectDescription = document.getElementById(`projectDescription${id}`).value;
    const projectStatus = document.getElementById(`projectStatus${id}`).value;
    
    // Tomar fechas de los inputs
    const projectStartDate = new Date(document.getElementById(`projectStartDate${id}`).value + "T00:00:00");
    const projectEndDate = new Date(document.getElementById(`projectEndDate${id}`).value + "T00:00:00");

    const projectTitleElement = document.querySelector(`#project${id} .project-title`);
    projectTitleElement.textContent = projectName;

    const projectSummaryElement = document.querySelector(`#project${id} .project-summary`);
    projectSummaryElement.textContent = projectDescription;

    const projectStateElement = document.querySelector(`#project${id} .project-state`);
    projectStateElement.classList.remove("project-pending", "project-in-progress", "project-completed");

    if (projectStatus === "pending") {
        projectStateElement.classList.add("project-pending");
        projectStateElement.textContent = "Pendiente";
    } else if (projectStatus === "in-progress") {
        projectStateElement.classList.add("project-in-progress");
        projectStateElement.textContent = "En progreso";
    } else if (projectStatus === "completed") {
        projectStateElement.classList.add("project-completed");
        projectStateElement.textContent = "Completado";
    }

    alert(`CAMBIOS GUARDADOS \nNombre: ${projectName}\nDescripción: ${projectDescription}\nEstado: ${projectStatus}`);

    const projectDates = document.querySelector(`#project${id} .project-dates`);
    projectDates.querySelector('p:nth-of-type(1)').innerHTML = `<strong>Fecha de inicio:</strong> ${projectStartDate.toLocaleDateString()}`;
    projectDates.querySelector('p:nth-of-type(2)').innerHTML = `<strong>Fecha de finalización:</strong> ${projectEndDate.toLocaleDateString()}`;
    
    const daysRemaining = Math.ceil((projectEndDate - projectStartDate) / (1000 * 60 * 60 * 24));
    projectDates.querySelector('p:nth-of-type(3)').innerHTML = `<strong>Días restantes:</strong> ${daysRemaining} días`;

    const menu = document.getElementById(`editMenu${id}`);
    menu.style.display = "none";
}

function addTask() {
    toggleTaskForm(); // Muestra el formulario para agregar tarea
}

function toggleTaskForm() {
    const taskForm = document.getElementById("taskForm");
    taskForm.style.display = taskForm.style.display === "none" || taskForm.style.display === "" ? "block" : "none";
}

function createTask() {
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskStartDate = new Date(document.getElementById("taskStartDate").value + "T00:00:00");
    const taskEndDate = new Date(document.getElementById("taskEndDate").value + "T00:00:00");

    const daysRemaining = Math.ceil((taskEndDate - taskStartDate) / (1000 * 60 * 60 * 24));

    const projectContainer = document.getElementById("projectContainer");

    // Crear nuevo proyecto
    const newProjectHTML = 
    
    `
        <button class="project-header" id="project${taskCounter}" onclick="toggleEditMenu('editMenu${taskCounter}')">
            <div class="project-info">
                <h1 class="project-title">${taskName}</h1>
                <p class="project-summary">${taskDescription}</p>
            </div>
            <div class="project-status">
                <div class="status-container">
                    <span>Estado del proyecto:</span>
                    <span class="project-state project-pending">Pendiente</span>
                </div>
                <div class="project-dates">
                    <p><strong>Fecha de inicio:</strong> ${taskStartDate.toLocaleDateString()}</p>
                    <p><strong>Fecha de finalización:</strong> ${taskEndDate.toLocaleDateString()}</p>
                    <p><strong>Días restantes:</strong> ${daysRemaining} días</p>
                </div>
            </div>
        </button>
        <div class="edit-menu" id="editMenu${taskCounter}">
            <h2>Editar Proyecto</h2>
            <label for="projectName${taskCounter}">Nombre del Proyecto:</label>
            <input type="text" id="projectName${taskCounter}" value="${taskName}" />

            <label for="projectDescription${taskCounter}">Descripción:</label>
            <textarea id="projectDescription${taskCounter}">${taskDescription}</textarea>

            <label for="projectStatus${taskCounter}">Estado:</label>
            <select id="projectStatus${taskCounter}">
                <option value="pending" selected>Pendiente</option>
                <option value="in-progress">En progreso</option>
                <option value="completed">Completado</option>
            </select>

            <label for="projectStartDate${taskCounter}">Fecha de Inicio:</label>
            <input type="date" id="projectStartDate${taskCounter}" value="${taskStartDate.toISOString().split('T')[0]}"/>

            <label for="projectEndDate${taskCounter}">Fecha de Finalización:</label>
            <input type="date" id="projectEndDate${taskCounter}" value="${taskEndDate.toISOString().split('T')[0]}"/>

            <button onclick="saveChanges(${taskCounter})">Guardar Cambios</button>
            <button onclick="toggleEditMenu('editMenu${taskCounter}')">Cancelar</button>
            <button onclick="deleteTask(${taskCounter})">Eliminar Tarea</button>
        </div>
    `;

    projectContainer.insertAdjacentHTML('beforeend', newProjectHTML);
    taskCounter++;

    // Ocultar el formulario después de crear la tarea
    toggleTaskForm();
}

function deleteTask(id) {
    const confirmation = confirm("¿Estás seguro de que deseas eliminar esta tarea?");
    if (confirmation) {
        // Eliminar el botón del proyecto
        const projectButton = document.getElementById(`project${id}`);
        if (projectButton) {
            projectButton.remove();
        }

        // Eliminar el menú de edición correspondiente
        const editMenu = document.getElementById(`editMenu${id}`);
        if (editMenu) {
            editMenu.remove();
        }
    }
}

function saveTaskChanges(id) {
    const projectName = document.getElementById(`projectName${id}`).value;
    const projectDescription = document.getElementById(`projectDescription${id}`).value;
    const projectStatus = document.getElementById(`projectStatus${id}`).value;

    const projectStateElement = document.querySelector(`#project${id} .project-state`);

    // Si el estado es completado, deshabilitamos la edición
    if (projectStatus === "completed") {
        alert("No se puede editar una tarea completada.");
        return;
    }

    const projectTitleElement = document.querySelector(`#project${id} .project-title`);
    projectTitleElement.textContent = projectName;

    const projectSummaryElement = document.querySelector(`#project${id} .project-summary`);
    projectSummaryElement.textContent = projectDescription;

    projectStateElement.classList.remove("project-pending", "project-in-progress", "project-completed");

    if (projectStatus === "pending") {
        projectStateElement.classList.add("project-pending");
        projectStateElement.textContent = "Pendiente";
    } else if (projectStatus === "in-progress") {
        projectStateElement.classList.add("project-in-progress");
        projectStateElement.textContent = "En progreso";
    } else if (projectStatus === "completed") {
        projectStateElement.classList.add("project-completed");
        projectStateElement.textContent = "Completado";
    }

    alert(`Cambios guardados en el proyecto ${id}:\nNombre: ${projectName}\nDescripción: ${projectDescription}\nEstado: ${projectStatus}`);

    const menu = document.getElementById(`editMenu${id}`);
    menu.style.display = "none";
}
