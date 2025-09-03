const key = '47ecdd0eecf8a1a7c6f4348013856674'; // PLZ DON'T USE MY KEY :<
const btn = document.getElementById('search')
const inputcity = document.querySelector('input')
const place = document.getElementById('place');
const days = document.getElementById('nextdays');
const icon = document.createElement('i');
let city = 'New York'
icon.classList.add('fa-solid', 'fa-location-crosshairs');

function refreshPage() {
    window.location.reload();
}
document.addEventListener('keydown',(event)=>{
    if(event.key == 'Enter') {
        city = inputcity.value
        searchcity(city)};
})

searchcity(city);
async function searchcity(city) {
    inputcity.value = ''
    // city = 'london'
    if(city){
        try {
            const weatherdata = await cityweather(city);
            const fivedaysdata = await fivedays(city);
            let i = 0
            weathericon('day1_icon',fivedaysdata.list[i+8].weather[0].id,'.subicon')
            weathericon('day2_icon',fivedaysdata.list[i+8*2].weather[0].id,'.subicon')
            weathericon('day3_icon',fivedaysdata.list[i+8*3].weather[0].id,'.subicon')
            weathericon('day4_icon',fivedaysdata.list[i+8*4].weather[0].id,'.subicon')
            document.getElementById('weekday1').textContent = (placetime(fivedaysdata.list[i+8].dt).weekday).substring(0,3);
            document.getElementById('weekday2').textContent = (placetime(fivedaysdata.list[i+8*2].dt).weekday).substring(0,3);
            document.getElementById('weekday3').textContent = (placetime(fivedaysdata.list[i+8*3].dt).weekday).substring(0,3);
            document.getElementById('weekday4').textContent = (placetime(fivedaysdata.list[i+8*4].dt).weekday).substring(0,3);
            document.getElementById('temp1').textContent = (fivedaysdata.list[i+8].main.temp - 272.15).toFixed(1) +'°C'
            document.getElementById('temp2').textContent = (fivedaysdata.list[i+8*2].main.temp - 272.15).toFixed(1) +'°C'
            document.getElementById('temp3').textContent = (fivedaysdata.list[i+8*3].main.temp - 272.15).toFixed(1) +'°C'
            document.getElementById('temp4').textContent = (fivedaysdata.list[i+8*4].main.temp - 272.15).toFixed(1) +'°C'
            // REAL PROGRAMMERS DON'T REPEAT THEMSELVES :>
            weathericon('main_icon',weatherdata.weather[0].id,'.icon')
            document.getElementById('weather').textContent = weatherdata.weather[0].description;
            document.getElementById('temp').textContent = (weatherdata.main.temp-272.15).toFixed(1)+'°C'
            document.getElementById('day').textContent = `${placetime(weatherdata.dt).day} ${placetime(weatherdata.dt).month} ${placetime(weatherdata.dt).year}`
            document.getElementById('date').textContent = placetime(weatherdata.dt).weekday
            document.getElementById('place').textContent = weatherdata.sys.country+' '+weatherdata.name
            document.getElementById('place').prepend(icon)
            document.getElementById('feel').textContent = (weatherdata.main.feels_like-272.15).toFixed(1) + '°C'
            document.getElementById('humid').textContent = weatherdata.main.humidity +'%'
            document.getElementById('wind').textContent = weatherdata.wind.speed +'km/h'
            
        } catch (error) {
            console.log(error)
        }
    }
    else{
        inputcity.placeholder = 'Please enter a city'
        setTimeout(()=>inputcity.placeholder ='Place',2000)
    }
}
async function cityweather(city) {
    
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    if(!response.ok){
        inputcity.placeholder = 'Please enter a valid name'
        setTimeout(()=>inputcity.placeholder ='Place',2000)
        throw new Error('Wrong city')
    }
    Array.from(days.children).forEach((element)=>element.style.display = 'flex')
    if (500<window.innerWidth&&window.innerWidth <= 1000) {
        days.children[3].style.display = 'none'
    }
    else if (window.innerWidth <= 500) {
        days.children[2].style.display = 'none'
        days.children[3].style.display = 'none'

    }
    document.getElementById('location').style.marginBottom = '5%';
    const data = await response.json()
    return data;
}
async function fivedays(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`)
    if(!response.ok){
        return new Error('Wrong 5 days city')
    }
    const data = await response.json()
    return data;
}

function placetime(timestamp) {
    // Create a new Date object using the timestamp (in milliseconds)
    const date = new Date(timestamp * 1000);
    // Extract year, month, day, and weekday from the Date object
    const year = date.getFullYear();
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()]; 
    const day = date.getDate();
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
    // Return the year, month, day, and weekday as an object
    return { year, month, day, weekday };
}
function weathericon(name_id,id,icon ) {
    if (200<=id&&id<300) {
        document.getElementById(name_id).className='fa-solid fa-cloud-bolt ' + icon.substring(1);
        document.querySelector('aside').style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url('thunderstorm.jpg')";
    }
    else if (300<=id&&id<400) {
        document.getElementById(name_id).className='fa-solid fa-cloud-rain ' + icon.substring(1)
        document.querySelector('aside').style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url('rain.jpg')";
    }
    else if (500<=id&&id<600) {
        document.getElementById(name_id).className='fa-solid fa-cloud-showers-heavy ' + icon.substring(1)
        document.querySelector('aside').style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url('heavyrain.jpg')";
    }
    else if (600<=id&&id<700) {
        document.getElementById(name_id).className='fa-regular fa-snowflake ' + icon.substring(1)
        document.querySelector('aside').style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url('snowfall.jpg')";
    }
    else if (700<=id&&id<800) {
        document.getElementById(name_id).className='fa-regular fa-smog ' + icon.substring(1)
        document.querySelector('aside').style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url('fog.jpg')";
    }
    
    else if (id==800) {
        document.getElementById(name_id).className='fa-regular fa-sun ' + icon.substring(1)
        document.querySelector('aside').style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url('sunset.jpg')";
    }
    else if (801<=id&&id<803) {
        document.getElementById(name_id).className='fa-solid fa-cloud ' + icon.substring(1)
        document.querySelector('aside').style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url('scatteredclouds.jpg')";
    }
    else if (803<=id&&id<900) {
        document.getElementById(name_id).className='fa-solid fa-cloud ' + icon.substring(1)
        document.querySelector('aside').style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url('cloudy.jpg')";
    }
    else {
        document.getElementById(name_id).className = 'fa-solid fa-question ' + icon.substring(1)   
        document.querySelector('aside').style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url('weatherunknown.png')";
    }
}