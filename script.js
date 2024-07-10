const content = document.getElementById('content');
const forecast = document.getElementById('forecast');
const boxContent = document.getElementById('boxContent');
const textbox = document.getElementById('textbox');
const submit = document.getElementById('submit');
const body = document.getElementById('body');
const more = document.getElementById('more');
const picture = document.getElementById('picture');
const api = 'b7c1639725070926d0449785f1db3e18';

let trueOrFalse = false;
let city = 'Salt Lake City, UT, US';
let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}&units=imperial`;


const main = data =>{
    console.log(data);
    let currentWeather = data.current.weather[0].main;
    if(currentWeather.includes('Cloud')){
        picture.innerHTML =`
        <h3>Its cloudy out there!</h3>
        <img src='clouds.jpg' width="500">
        `
    }
    else if(currentWeather.includes('Clear')){
        picture.innerHTML =`
        <h3>Clear skies ahead!</h3>
        <img src='clear.jpg' width='20%'>
        `
    }
    else if(currentWeather.includes('Snow')){
        picture.innerHTML =`
        <h3>Snow incoming!</h3>
        <img src='snow.jpg' width='20%'>
        `
    }
    else if(currentWeather.includes('Rain')){
        picture.innerHTML =`
        <h3>Rain rain come again!</h3>
        <img src='rain.jpg' width='25%'>
        `
    }
    console.log("test");
    let now = `
    <h2>Todays weather</h2>
    <p>
    Temp: ${data.current.temp}&deg;F <br />
    Weather: ${data.current.weather[0].description}
    </p>
    `;
    if(trueOrFalse == true){
    now = `
    <h2>Todays weather</h2>
    <p>
    Temp: ${data.current.temp}&deg;F <br />
    Weather: ${data.current.weather[0].description}<br />
    Humidity: ${data.current.humidity}%<br />
    Wind speed: ${data.current.wind_speed}mph
    </p>
    `;
    }
    content.innerHTML = now;
};

const loadName = () => {
    let name = localStorage.getItem('name');
    if(name != null){
        boxContent.innerHTML = `Now viewing ${name}`;
    }
}

const saveName = () => {
    boxContent.innerHTML = `Now viewing ${textbox.value}`;
    city = textbox.value;
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}&units=imperial`;
    getSite();
    textbox.value = '';
}

const loadMore = data => {
    trueOrFalse = true;
    getSite();
};

submit.addEventListener('click', saveName);
more.addEventListener('click', loadMore);

loadName;
getSite();

function getSite(){
    fetch(url)
    .then(response => response.json())
    .then(fiveDay_threeHour_data => {
        let lon = fiveDay_threeHour_data.city.coord.lon;
        let lat = fiveDay_threeHour_data.city.coord.lat;
        let new_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api}`
        fetch(new_url)
            .then(response => response.json())
            .then(data => {
                main(data);
        });
    });
}
