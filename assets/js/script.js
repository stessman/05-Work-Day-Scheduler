//let todaysDateArea = $('#currentDay');
let todaysDateArea = document.querySelector("#currentDay");
let DateTime = luxon.DateTime;
let dt = DateTime.now();
let currentHour = Number(dt.toFormat("HH"));
let allHourAreas = document.querySelectorAll(".hour");
let container = document.querySelector(".container");

container.addEventListener("click", saveTextAreaToLocalStorage);

// Sets a timer for ever half second to update the information on the page
var textareaInterval = window.setInterval(updatePage, 500);


function updatePage () {
     dt = DateTime.now();
     currentHour = Number(dt.toFormat("HH"));
    displayTodaysDate();
    setTextAreaColors();
}

//Displays today's day of the week, month, and day number in the jumbotron
function displayTodaysDate() {
    //why does jquery not work
    //how does onload work
    todaysDateArea.innerHTML = dt.toLocaleString({weekday: 'long', month: 'long', day: "numeric"});
}

//Changes the color of the textareas based on if the hour is in the past, present, or future
function setTextAreaColors () {
    for (var i = 0; i < allHourAreas.length; i++){
        var hourNumber = Number(allHourAreas[i].getAttribute("data-hournum"));
            if(hourNumber < currentHour) {
                allHourAreas[i].nextElementSibling.setAttribute("class", "description col-10 past");
            } else if (hourNumber === currentHour) {
                allHourAreas[i].nextElementSibling.setAttribute("class", "description col-10 present");
            } else {
                allHourAreas[i].nextElementSibling.setAttribute("class", "description col-10 future");
            }
    }
}

function saveTextAreaToLocalStorage (event) {
    event.preventDefault();
    var saveButton = event.target;
    if (saveButton.nodeName === "BUTTON" || saveButton.nodeName === "I"){
        if (saveButton.parentElement.nodeName === "BUTTON"){
            saveButton = saveButton.parentElement;
        }
        var siblingTextarea = saveButton.previousElementSibling;
        var textareaText = siblingTextarea.value;
        var siblingHour = siblingTextarea.previousElementSibling.getAttribute("data-hourNum");
        if (textareaText.trim() !== ""){
            localStorage.setItem(siblingHour, textareaText);
        }
}
}


displayTodaysDate();
setTextAreaColors();