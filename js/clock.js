const clock = {
    hourHand : document.querySelector('.hour-hand'),
    minHand : document.querySelector('.min-hand'),
    secondHand : document.querySelector('.second-hand')
};

(function setupClock(clock){
    let date = new Date();
    let seconds = (date.getTime()/1000)+3600;
    
    let hourAngle = Math.round((seconds%(12*3600)*1/3600*30));
    let minAngle = Math.round((seconds%3600)/60*6);
    seconds = Math.round(seconds%60)*6;

    clock.hourHand.style.transform=`rotate(${hourAngle-90}deg)`;
    clock.minHand.style.transform=`rotate(${minAngle-90}deg)`;
    clock.secondHand.style.transform=`rotate(${seconds-90}deg)`;

})(clock);

(function drawClockface(){
    const clockFace = document.querySelector('.clock-face');

    for(let i=0; i<360; i+=30){
        let mark = document.createElement('div');
        mark.classList.add('mark');
        mark.style.transform=`rotate(${i}deg)`;
        clockFace.appendChild(mark);
    }

})();

function rotateDegree(el) {
    let computed = getComputedStyle(el,null);
    let trans = computed.getPropertyValue("transform");
    let values = trans.split('(')[1].split(')')[0].split(',');
    
    let a = values[0];
    let b = values[1];
    var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    return angle;
}

function clockTick(clock)
{
    let hourRotation = rotateDegree(clock.hourHand);
    let minRotation = rotateDegree(clock.minHand);
    let secondRotation = rotateDegree(clock.secondHand);
    
    clock.hourHand.style.transform=`rotate(${hourRotation+1/3600}deg)`;
    clock.minHand.style.transform=`rotate(${minRotation+1/60}deg)`;
    clock.secondHand.style.transform=`rotate(${secondRotation+6}deg)`;
}

window.setInterval(function(){
    clockTick(clock);
}, 1000);


