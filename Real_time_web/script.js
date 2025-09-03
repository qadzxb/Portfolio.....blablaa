function updateTime(){
    const date = new Date();
    const day = date.getDate().toString().padStart(2,0);
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let week_day = weekday[date.getDay()];
    const month = date.toLocaleDateString('en',{month:'long'});
    const year = date.getFullYear().toString().padStart(2,0);
    const hour = date.getHours().toString().padStart(2,0);
    const min = date.getMinutes().toString().padStart(2,0);
    const sec = date.getSeconds().toString().padStart(2,0);
    const realTime = `${hour}:${min}:${sec}`;
    const realDay = `${day} ${month} ${year}`;
    document.getElementById("date").textContent = week_day;
    document.getElementById("day").textContent = realDay;
    document.getElementById("time").textContent = realTime;
}
updateTime()
setInterval(updateTime,1000)