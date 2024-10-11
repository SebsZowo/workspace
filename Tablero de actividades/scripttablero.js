let taskCounter = 2; // Contador para las nuevas tareas

function toggleEditMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block"; // Muestra el menú
    } else {
        menu.style.display = "none"; // Oculta el menú
    }
}

function saveChanges() {
    const projectName = document.getElementById("projectName").value;
    const projectDescription = document.getElementById("projectDescription").value;
    const projectStatus = document.getElementById("projectStatus").value;

    const projectTitleElement = document.querySelector("#project1 .project-title");
    projectTitleElement.textContent = projectName;

    const projectSummaryElement = document.querySelector("#project1 .project-summary");
    projectSummaryElement.textContent = projectDescription;

    const projectStateElement = document.querySelector("#project1 .project-state");
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

    alert(`Cambios guardados:\nNombre: ${projectName}\nDescripción: ${projectDescription}\nEstado: ${projectStatus}`);

    const menu = document.getElementById("editMenu1");
    menu.style.display = "none";
}

function addTask() {
    const projectContainer = document.getElementById("projectContainer");

    // Crear nuevo proyecto
    const newProjectHTML = `
        <button class="project-header" id="project${taskCounter}" onclick="toggleEditMenu('editMenu${taskCounter}')">
            <div class="project-info">
                <h1 class="project-title">Nuevo Proyecto ${taskCounter}</h1>
                <p class="project-summary">Descripción breve del nuevo proyecto.</p>
            </div>
            <div class="project-status">
                <div class="status-container">
                    <span>Estado del proyecto:</span>
                    <span class="project-state project-pending">Pendiente</span>
                </div>
                <div class="project-dates">
                    <p><strong>Fecha de inicio:</strong> --/--/----</p>
                    <p><strong>Fecha de finalización:</strong> --/--/----</p>
                    <p><strong>Días restantes:</strong> -- días</p>
                </div>
            </div>
        </button>
        <div class="edit-menu" id="editMenu${taskCounter}">
            <h2>Editar Proyecto</h2>
            <label for="projectName${taskCounter}">Nombre del Proyecto:</label>
            <input type="text" id="projectName${taskCounter}" value="Nuevo Proyecto ${taskCounter}" />
            
            <label for="projectDescription${taskCounter}">Descripción:</label>
            <textarea id="projectDescription${taskCounter}">Descripción breve del nuevo proyecto.</textarea>
            
            <label for="projectStatus${taskCounter}">Estado:</label>
            <select id="projectStatus${taskCounter}">
                <option value="pending" selected>Pendiente</option>
                <option value="in-progress">En progreso</option>
                <option value="completed">Completado</option>
            </select>

            <button onclick="saveTaskChanges(${taskCounter})">Guardar Cambios</button>
            <button onclick="toggleEditMenu('editMenu${taskCounter}')">Cancelar</button>
        </div>
    `;

    projectContainer.insertAdjacentHTML('beforeend', newProjectHTML);
    taskCounter++;
}

function saveTaskChanges(id) {
    const projectName = document.getElementById(`projectName${id}`).value;
    const projectDescription = document.getElementById(`projectDescription${id}`).value;
    const projectStatus = document.getElementById(`projectStatus${id}`).value;

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

    alert(`Cambios guardados en el proyecto ${id}:\nNombre: ${projectName}\nDescripción: ${projectDescription}\nEstado: ${projectStatus}`);

    const menu = document.getElementById(`editMenu${id}`);
    menu.style.display = "none";
}
