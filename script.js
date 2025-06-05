const sheetId = "2PACX-1vQKJ2XLNedZMDujiSaVtSv40li98ULwmRk-QeEeHkb7tGtFp_eMfcl9j5eAEJhwpwtSWIL1fKneXgsx"; // Reemplaza con el ID real de tu hoja
const sheetURL = `https://script.google.com/macros/s/AKfycbyXydFSnz1beZsMAHOsnvKFk_yahcoQkgzst6fbP5-THThXC2dlXUF4uAEUetQ-Wy2o/exec`;

async function fetchSheetData() {

    const hideShowItems = ["board-principal"];
    const loader = document.getElementById("loader");

    try {

        //Cargar datos de la hoja de cálculo
        const response = await fetch(sheetURL);
        const data = await response.json();

        getWeekAdvancement();
        const advancement = getWeekAdvancement() / 7;
        //document.getElementById("indicador-text").innerHTML = getWeekDay() + " | " + (advancement*100).toFixed(2) + "%";
        
        const i = getWeekIndex();
        document.getElementById("dormirX").innerHTML = "" + getDurationFromMinutes(data[i].dorPV, "h:m");
        document.getElementById("productivoX").innerHTML = "" + getDurationFromMinutes(data[i].proPV, "h:m");
        document.getElementById("ocioX").innerHTML = "" + getDurationFromMinutes(data[i].ociPV, "h:m");
        document.getElementById("ejercicioX").innerHTML = "" + getDurationFromMinutes(data[i].ejePV, "h:m");
        document.getElementById("clarineteX").innerHTML = "" + getDurationFromMinutes(data[i].clarPV, "h:m");
        document.getElementById("pianoX").innerHTML = "" + getDurationFromMinutes(data[i].piaPV, "h:m");
        document.getElementById("leerX").innerHTML = "" + getDurationFromMinutes(data[i].leePV, "h:m");
        document.getElementById("socialX").innerHTML = "" + getDurationFromMinutes(data[i].socPV, "h:m");
        document.getElementById("transporteX").innerHTML = "" + getDurationFromMinutes(data[i].traPV, "h:m");
        document.getElementById("comerX").innerHTML = "" + getDurationFromMinutes(data[i].comPV, "h:m");
        //document.getElementById("claseX").innerHTML = "" + getDurationFromMinutes(data[i].clasPV, "h m");
        document.getElementById("nadaX").innerHTML = "" + getDurationFromMinutes(data[i].nadPV, "h:m");

        document.getElementById("dormirR").innerHTML = "" + getDurationFromMinutes(Math.round(data[i].dorPV*advancement), "h:m");
        document.getElementById("productivoR").innerHTML = "" + getDurationFromMinutes(Math.round(data[i].proPV*advancement), "h:m");
        document.getElementById("ocioR").innerHTML = "" + getDurationFromMinutes(Math.round(data[i].ociPV*advancement), "h:m");
        document.getElementById("ejercicioR").innerHTML = "" + getDurationFromMinutes(Math.round(data[i].ejePV*advancement), "h:m");
        document.getElementById("clarineteR").innerHTML = "" + getDurationFromMinutes(Math.round(data[i].clarPV*advancement), "h:m");
        document.getElementById("pianoR").innerHTML = "" + getDurationFromMinutes(Math.round(data[i].piaPV*advancement), "h:m");
        document.getElementById("leerR").innerHTML = "" + getDurationFromMinutes(Math.round(data[i].leePV*advancement), "h:m");
        document.getElementById("socialR").innerHTML = "" + getDurationFromMinutes(Math.round(data[i].socPV*advancement), "h:m");
        document.getElementById("transporteR").innerHTML = "" + getDurationFromMinutes(Math.round(data[i].traPV*advancement), "h:m");
        document.getElementById("comerR").innerHTML = "" + getDurationFromMinutes(Math.round(data[i].comPV*advancement), "h:m");
        //document.getElementById("claseX").innerHTML = "" + getDurationFromMinutes(Math.round(data[i].clasPV*advancement), "h m");
        document.getElementById("nadaR").innerHTML = "" + getDurationFromMinutes(Math.round(data[i].nadPV*advancement), "h:m");
       
        loadEvents(data[i].COMENTARIOS);
        loadTasks(data[i].TAREAS);

        // Actualizar los elementos al acabar de cargar los datos
       displayContent(loader, hideShowItems);
       
       return data;
    } catch (error) {
        loader.textContent = "Error al cargar los datos 😓"
        console.error("Error al obtener los datos:", error);
    }
    
}

function loadEvents(events) {
    if (events == "") return;

    const showElement = document.getElementById("board-secundario-eventos");
    showElement.classList.remove("invisible");
    showElement.classList.add("visible");
    
    var eventsNames = events.split(". ");
    var total = ["evento1", "evento2", "evento3", "evento4", "evento5", "evento6", "evento7"];

    for (let i = 0; i < eventsNames.length; i++) {
        const eventElement = document.getElementById(total[i]);
        var palabras = eventsNames[i].split(" ");
        var day = 0;

        if (palabras[palabras.length - 2] === "día") {
            day = palabras[palabras.length - 1];
            eventElement.innerHTML = `[Día ${day}] ${palabras.slice(0, -2).join(" ")}`;
        } else {
            eventElement.innerHTML = eventsNames[i];
        }

        eventElement.classList.display = "block";
        eventElement.classList.remove("invisible2");
        eventElement.classList.add("visible");
    }
}

function loadTasks(events) {
    if (events == "") return;

    const showElement = document.getElementById("board-secundario-tareas");
    showElement.classList.remove("invisible");
    showElement.classList.add("visible");

    var tasksNames = events.split(". ");
    var total = ["tarea1", "tarea2", "tarea3", "tarea4", "tarea5", "tarea6", "tarea7"];

    for (let i = 0; i < tasksNames.length; i++) {
        const taskElement = document.getElementById(total[i]);
        var completed = tasksNames[i].charAt(tasksNames[i].length - 1) === "*";
        if (completed) {
            tasksNames[i] = tasksNames[i].slice(0, -1); // Eliminar el asterisco al final
        }
        var palabras = tasksNames[i].split(" ");
        var day = 0;

        if (palabras[palabras.length - 2] === "día") {
            day = palabras[palabras.length - 1];
            taskElement.innerHTML = `${completed ? "<s>" : ""}[Día ${day}] ${palabras.slice(0, -2).join(" ")}${completed ? "</s>" : ""}`;
        } else {
            taskElement.innerHTML = (completed ? "<s>" : "") + tasksNames[i] + (completed ? "</s>" : "");
        }

        taskElement.classList.display = "block";
        taskElement.classList.remove("invisible2");
        taskElement.classList.add("visible");
    }
}

function displayContent(hide, show) {

    hide.style.display = "none";

    for (const name of show) {
        const element = document.getElementById(name);
        element.classList.remove("invisible");
        element.classList.add("visible");
    }
}

function getWeekIndex() {
    const initDay = new Date("2025-02-08");
    const today = new Date();
    const diff = today - initDay;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    return diffWeeks;
}

function getDurationFromMinutes(minutes, format) {
    const hoursNum = Math.floor(minutes / 60);
    const remainingMinutesNum = minutes % 60;

    const hours = hoursNum < 10 ? hoursNum.toString().padStart(2, '0') : hoursNum.toString();
    const remainingMinutes = remainingMinutesNum < 10 ? remainingMinutesNum.toString().padStart(2, '0') : remainingMinutesNum.toString();

    if (format === "h m") {
        return `${hours}h ${remainingMinutes}m`;
    } else if (format === "horas minutos") {
        return `${hours} horas y ${remainingMinutes} minutos`;
    } else if (format === "horas") {
        return `${hours} horas`;
    } else if (format === "minutos") {
        return `${remainingMinutes} minutos`;
    } else if (format === "h:m") {
        return `${hours}:${remainingMinutes}`;
    }
    return "N/A :D";
}

function getWeekDay() {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const hoy = new Date();
    return dias[hoy.getDay()];
}

function getWeekAdvancement() {
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    return ((diaSemana + 1) % 7) + 1;
}





fetchSheetData();
