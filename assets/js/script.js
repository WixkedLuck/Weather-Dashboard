//Declare global Vars
var $SearchBtn = $('#SearchBtn');
var $ClearBtn = $('#Clear');
var Input = document.querySelector('#search-city');
var CityName = document.querySelector('#CityName');
var Temp = document.querySelector('#Temp');
var Wind = document.querySelector('#Wind');
var Humid = document.querySelector('#Humidity');
var Index = document.querySelector('#Index');
const BtnPlace = document.getElementById('#BtnSpots');
let createImage= document.createElement('img');
let createImage2= document.createElement('img');
let createImage3= document.createElement('img');

//assign UserInput to id of textbox

function addEntry() {
    // Parse any JSON previously stored in allEntries
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries == null) existingEntries = [];
    for (i = 0; i < existingEntries; i++) {
        if (existingEntries[i] == document.getElementById("search-city").value) {
            return;
        }
    }
    var entryTitle = document.getElementById("search-city").value;
    var entry = {
        "citys": entryTitle

    };
    localStorage.setItem("entry", JSON.stringify(entry));
    // Save allEntries back to local storage
    existingEntries.push(entry);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
};







$SearchBtn.on('click', function (event) {
    console.log(Input.value);
    addEntry();
    

    // Fetch request to get current citys info
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + Input.value + '&appid=ec96c3d6509b8a012ba07a86b8f2719b')
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            var CityValue = data['name'];
            var TemperValue = data['main']['temp'];
            var windValue = data['wind']['speed'];
            var HumidValue = data['main']['humidity'];
            var ImgValue = data.weather[0].icon;


            CityName.innerHTML = (CityValue + " ");
            var convertTemp = Math.trunc(1.8 * (TemperValue - 273) + 32);
            Temp.innerHTML = ("Temperature: " + convertTemp + " °F");
            Wind.innerHTML = ("Wind: " + windValue + " mph");
            Humid.innerHTML = ("Humidity: " + HumidValue);


            createImage.src= "http://openweathermap.org/img/wn/" + ImgValue + ".png";
            
            document.getElementById('Index').append(createImage);
            let btn = document.createElement("button");
            btn.textContent = (Input.value);
            document.getElementById('BtnSpots').appendChild(btn);
            
            btn.addEventListener('click', function(){
                
            })
        })



    .catch(err => alert("Wrong city name"))

    // fetch request to get 5-day forecast
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + Input.value + '&units=imperial&appid=ec96c3d6509b8a012ba07a86b8f2719b')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (i = 0; i < 5; i++) {
                document.getElementById("Temp" + (i + 1)).innerHTML = 'Temp: ' + Number(data.list[i + 1].main.temp).toFixed(0) + "°F";
            }
            for (i = 0; i < 5; i++) {
                document.getElementById("Wind" + (i + 1)).innerHTML = 'Wind: ' + Number(data.list[i + 1].wind.speed) + " Mph";
            }
            for (i = 0; i < 5; i++) {
                document.getElementById("Humidity" + (i + 1)).innerHTML = 'Humidity: ' + Number(data.list[i + 1].main.humidity);
            }
            for (i = 0; i < 5; i++) {
                document.getElementById("Date" + (i + 1)).innerHTML = (data.list[i + 1].dt_txt);
            }

            
        })

});






$ClearBtn.on('click', function () {
    localStorage.clear();
})