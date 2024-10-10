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

    // Actualiza el título del proyecto
    const projectTitleElement = document.querySelector(`#project1 .project-title`);
    projectTitleElement.textContent = projectName;

    // Actualiza la descripción del proyecto
    const projectSummaryElement = document.querySelector(`#project1 .project-summary`);
    projectSummaryElement.textContent = projectDescription;

    // Actualiza el estado del proyecto
    const projectStateElement = document.querySelector(`#project1 .project-state`);
    projectStateElement.textContent = projectStatus === 'pending' ? 'Pendiente' : projectStatus === 'in-progress' ? 'En progreso' : 'Completado';

    // Opcional: mostrar alerta con los cambios
    alert(`Cambios guardados:\nNombre: ${projectName}\nDescripción: ${projectDescription}\nEstado: ${projectStatus}`);

    // Opcionalmente oculta el menú después de guardar
    toggleEditMenu('editMenu1');
}
