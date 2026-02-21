const blowButton = document.getElementById('blowButton');
const flame = document.querySelector('.flame');
const smoke = document.querySelector('.smoke');
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = [];
function createConfetti() {
    for(let i=0;i<150;i++){
        confetti.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height - canvas.height,
            r: Math.random()*6+2,
            d: Math.random()*150+50,
            color: `hsl(${Math.random()*360},100%,50%)`,
            tilt: Math.random()*10-10
        });
    }
}
createConfetti();

function drawConfetti() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach((c)=>{
        ctx.beginPath();
        ctx.lineWidth = c.r/2;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt, c.y);
        ctx.lineTo(c.x + c.tilt + c.r/2, c.y + c.r);
        ctx.stroke();

        c.y += Math.cos(c.d) + 1 + c.r/2;
        c.x += Math.sin(c.d);
        c.d += 0.01;

        if(c.y > canvas.height){
            c.y = -10;
            c.x = Math.random()*canvas.width;
        }
    });
    requestAnimationFrame(drawConfetti);
}

blowButton.addEventListener('click', () => {
    flame.style.display = 'none';
    smoke.style.opacity = '1';
    setTimeout(()=>{ smoke.style.opacity='0'; }, 2000);
    drawConfetti();
});
