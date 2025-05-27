const sheetId = "2PACX-1vQKJ2XLNedZMDujiSaVtSv40li98ULwmRk-QeEeHkb7tGtFp_eMfcl9j5eAEJhwpwtSWIL1fKneXgsx"; // Reemplaza con el ID real de tu hoja
const sheetURL = `https://script.google.com/macros/s/AKfycbyXydFSnz1beZsMAHOsnvKFk_yahcoQkgzst6fbP5-THThXC2dlXUF4uAEUetQ-Wy2o/exec`;

async function fetchSheetData() {

    const loader = document.getElementById("loader");
    const indicador = document.getElementById("indicador");
    const contenido = document.getElementById("board-principal");

    try {
        const response = await fetch(sheetURL);
        const data = await response.json();
        
        const jsonString = JSON.stringify(data, null, 2);

        getWeekAdvancement();
        const advancement = getWeekAdvancement() / 7;
        document.getElementById("indicador-text").innerHTML = getWeekDay() + " | " + (advancement*100).toFixed(2) + "%";
        
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
        
        /*
        document.getElementById("dormirR").innerHTML = "" + data[i-1].dorV.toFixed(2);
        document.getElementById("productivoR").innerHTML = "" + data[i-1].proV.toFixed(2);
        document.getElementById("ocioR").innerHTML = "" + data[i-1].ociV.toFixed(2);
        document.getElementById("ejercicioR").innerHTML = "" + data[i-1].ejeV.toFixed(2);
        document.getElementById("clarineteR").innerHTML = "" + data[i-1].clarV.toFixed(2);
        document.getElementById("pianoR").innerHTML = "" + data[i-1].piaV.toFixed(2);
        document.getElementById("leerR").innerHTML = "" + data[i-1].leeV.toFixed(2);
        document.getElementById("socialR").innerHTML = "" + data[i-1].socV.toFixed(2);
        document.getElementById("transporteR").innerHTML = "" + data[i-1].traV.toFixed(2);
        document.getElementById("comerR").innerHTML = "" + data[i-1].comV.toFixed(2);
        //document.getElementById("claseR").innerHTML = "" + data[i-1].clasV.toFixed(2);
        document.getElementById("nadaR").innerHTML = "" + data[i-1].nadV.toFixed(2);
        */
       
       loader.style.display = "none";
       contenido.classList.remove("invisible");
       contenido.classList.add("visible");
       
       indicador.classList.remove("invisible");
       indicador.classList.add("visible");
       
       return data;
    } catch (error) {
        loader.textContent = "Error al cargar los datos 😓"
        console.error("Error al obtener los datos:", error);
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
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
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



//var docData = fetchSheetData();
// debugger;
// generarTabla(docData);
//setInterval(fetchSheetData, 30000); // Actualizar cada 30 segundos