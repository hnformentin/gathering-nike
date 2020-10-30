var creal = -.8;
var cimag = .156;
var canvas = document.getElementById("canvas");
var mainArea = document.getElementById("main");
var context = canvas.getContext('2d');
var frame = 0;
var timerId = 0;

var pallette = [];

// Fractal - source: https://morioh.com/p/5db14dad11f2
function julia()
{
    for (let y=0; y<200; y++)
    {
        for(let x=0;x<200;x++)
        {
            var cx = -2 + x/50;
            var cy = -2 + y/50;
            var i = 0;

            do{
                let xt = cx*cx- cy*cy+creal;
                cy = 2*cx*cy + cimag;
                cx = xt;
                i++;
            }
            while ((cx*cx+cy*cy<4)&& i<25);

            context.beginPath();
            context.rect(x*4, y*4,4,4);
            context.fillStyle = pallette[i];
            context.fill();
        }
    }
    frame++;
    creal =-.8 + 6*Math.sin(frame/(3.14*20));
    cimag = .156+4*Math.cos(frame/(3.14*40));

}

for(let x=0; x<9; x++)
{
    let color=(31*x).toString(16);
    if(color.length==1) color= '0' + color;
    pallette[x]="#"+color+color+"ff";
    pallette[x+8] = "#00ff" + color;
    pallette[17+x] = "#" + color + "0000";
}

function hideEasterEgg(e){
    canvas.style.display = "none";
    mainArea.style.display = "block";
    canvas.onclick = "";
    clearInterval(timerId);
}

export default function showEasterEgg()
{
    canvas.style.display = "block";
    mainArea.style.display = "none";
    timerId  = setInterval(julia, 100);
    canvas.onclick= hideEasterEgg;
} 