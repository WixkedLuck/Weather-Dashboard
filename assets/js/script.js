//Declare global Vars
var $SearchBtn = $('#SearchBtn');
var Input = document.querySelector('#search-city');
var CityName = document.querySelector('#CityName');;
var Temp = document.querySelector('#Temp');
var Wind = document.querySelector('#Wind');
var Humid = document.querySelector('#Humidity');
var Index = document.querySelector('#Index');
var Photo = document.querySelector('#Image');


//assign UserInput to id of textbox




$SearchBtn.on('click', function (event) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + Input.value + '&appid=ec96c3d6509b8a012ba07a86b8f2719b')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var CityValue = data['name'];
            var TemperValue = data['main']['temp'];
            var windValue = data['wind']['speed'];
            var HumidValue = data['main']['humidity'];
            var ImgValue= data.weather[0].icon;
        
            CityName.innerHTML = (CityValue+" ");
            var convertTemp= Math.trunc(1.8*(TemperValue-273) + 32);
            Temp.innerHTML = ("Temperature: " + convertTemp+" °F");
            Wind.innerHTML = ("Wind: " + windValue+" mph");
            Humid.innerHTML = ("Humidity: " + HumidValue);
            
           
            Photo.innerHTML.src="http://openweathermap.org/img/wn/"+ImgValue+".png";
            
        })



        .catch(err => alert("Wrong city name"))

});
