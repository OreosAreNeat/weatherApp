const content = document.getElementById('content');
const forecast = document.getElementById('forecast');
const boxContent = document.getElementById('boxContent');
const textbox = document.getElementById('textbox');
const submit = document.getElementById('submit');
let trueOrFalse = false;
const api = 'b7c1639725070926d0449785f1db3e18';
let city = 'Salt Lake City, UT, US';

let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}&units=imperial`;


const main = data =>{
    console.log(data);
    let date = new Date();
    let otherDays = '';
    for(let i=0; i<=4; i++) {
        if(trueOrFalse == false){
            the_day = new Date(date.setDate(date.getDate() + 1));
            otherDays += `
            <h2>${the_day.getMonth()+1}/${the_day.getDate()}</h2>
            <p>
            Temp: ${data.daily[i].temp.day}&deg;F <br />
            Weather: ${data.daily[i].weather[0].description}
            </p>
            `;
            }
            if(trueOrFalse == true){
            the_day = new Date(date.setDate(date.getDate() + 1));
            otherDays += `
            <p>
            <h2>${the_day.getMonth()+1}/${the_day.getDate()}</h2>
            Temp: ${data.daily[i].temp.day}&deg;F <br />
            Weather: ${data.daily[i].weather[0].description}<br />
            Humidity: ${data.daily[i].humidity}%<br />
            Wind speed: ${data.daily[i].wind_speed}mph
            </p>
            `;
            }
    }
    forecast.innerHTML = otherDays;
};

const loadName = () => {
    let name = localStorage.getItem('name');
    if(name != null){
        boxContent.innerHTML = `hello ${name}`;
    }
}

const saveName = () => {
    localStorage.setItem('name', textbox.value);
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