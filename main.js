console.log('I AM CANVAS');
var canvas;
var ctx;
var gShape;
var gPrevX,gPrevY;
var gIsMouseDown = false;

function init() {
    canvas = document.querySelector('#canvas');
    canvas.width = window.innerWidth * 0.99;
    canvas.height = window.innerHeight * 0.80;

    ctx = canvas.getContext('2d');
}

function handleMouseDown(ev) {
    if (ev.which === 1) setPrevCoord(ev.offsetX, ev.offsetY)
}

function setPrevCoord(x, y) {
    if(gShape === 'line'){
        gPrevX = x;
        gPrevY = y;
  }
}

function changeColor(color) {
    
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawCircle(x, y) {
    ctx.beginPath(); //in order to start new path

    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawMultiCircles(x, y){

    for (let i = 0; i < 4; i++) {
        ctx.beginPath();//to disconnect from where the last line was
        ctx.arc(x, y, i*5, 0, Math.PI * 2, false);

        //change arc color
        ctx.strokeStyle = getRandomColor();
        ctx.stroke();
    }

}

function drawSquare(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, 30, 30);
    ctx.stroke();
}

function drawTraingle(x, y) {

    ctx.beginPath();
    ctx.moveTo(x, y)
    ctx.lineTo(x, x + 10)
    ctx.lineTo(x * 2, y * 2);
    ctx.closePath();
    ctx.stroke();

}

function drawLine(x, y) {
    ctx.beginPath();
    ctx.moveTo(gPrevX,gPrevY); //in order to start new path
    ctx.lineTo(x,y);
    ctx.stroke();
    setPrevCoord(x, y);
}


function onUpdateShape(shape) {
    gShape = shape;
}

function downloadCanvas(elLink) {
    elLink.href = canvas.toDataURL();
    elLink.download = 'my_canvas.jpg';
}

function drawShape(ev) {
    
    if (ev.which !== 1) return;
    
    var x = ev.offsetX;
    var y = ev.offsetY;

    switch (gShape) {
        case 'circle':
            drawCircle(x, y);
            break;

        case 'square':
            drawSquare(x, y);
            break;

        case 'traingle':
            drawTraingle(x, y);
            break;

        case 'mCircles':
            drawMultiCircles(x,y);
            break;

        case 'line':
            drawLine(x,y);
            break;
    }
}

function clearCanvas(){
    ctx.clearRect(0,0, canvas.width,canvas.height);
}