const hours = document.getElementById('hours');
const mins = document.getElementById('mins');
const sec = document.getElementById('sec');
const ms = document.getElementById('ms');
let isOn = 0;
let bf = 0;
let after = 0;
let runningTime;



function start() {
    if(!isOn){
        bf = Date.now()-after ;
        // + (1000*60)*50+1000 +after
        // mins.textContent = Math.floor((now-bf)/(1000*60))%60*50;
        // sec.textContent = Math.floor((now-bf)/1000)%60;
        // ms.textContent = Math.floor(((now-bf)%1000)/10);

        isOn = !isOn;
        runningTime = setInterval(running,10);
    }
}
function stop() {
    if(isOn){
        isOn = !isOn;
        clearInterval(runningTime);
    } 
}
function reset() {
    after = 0;
    now = Date.now();
    bf = Date.now() ;
    //+(1000*60)*50 +1000
    hours.textContent = (Math.floor((now-bf)/(1000*60*60))%60).toString().padStart(2,0);
    mins.textContent = (Math.floor((now-bf)/(1000*60))%60).toString().padStart(2,0);
    sec.textContent = (Math.floor((now-bf)/1000)%60).toString().padStart(2,0);
    ms.textContent = (Math.floor(((now-bf)%1000)/10)).toString().padStart(2,0);
    }
function running(){
    
        const now = Date.now();
        hours.textContent = (Math.floor((now-bf)/(1000*60*60))%60).toString().padStart(2,0);
        mins.textContent = (Math.floor((now-bf)/(1000*60))%60).toString().padStart(2,0);
        sec.textContent = (Math.floor((now-bf)/1000)%60).toString().padStart(2,0);
        ms.textContent = (Math.floor(((now-bf)%1000)/10)).toString().padStart(2,0);
        after = now-bf;
        //-(1000*60)*50-1000 
}