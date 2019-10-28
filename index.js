var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.height = '600';
canvas.width = '600';

var lineWidth = 1;

document.getElementById('lineWidth').addEventListener('change', function () {
    lineWidth = this.value;
});

var fractalNumber = 2;
var start = false;

function Point( x, y, width, probability) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.probability = probability;
    return this;
}

var pointArray = [];
pointArray.push(new Point(0,0,0.5,10));
pointArray.push(new Point(580,0,0.5,10));
pointArray.push(new Point(300,580,0.5,10));

drawMainPoints();

function drawMainPoints() {
    context.clearRect(0, 0, canvas.width, canvas.height);
   for(let i=0; i< pointArray.length; i++){
        context.font = "italic 20px Arial";
        context.fillStyle = '#ff090f';
        context.fill();
        context.fillRect(pointArray[i].x, pointArray[i].y, 20, 20);
        context.fillStyle = '#fff';
        context.fill();
        context.fillText(`${i}`, pointArray[i].x+4, pointArray[i].y+18);
    }
}

function addPoint() {
    fractalNumber ++;
    pointArray.push(new Point(0,0,0.5,10));
    document.getElementById('points').innerHTML +=
        ` <div id='${fractalNumber}' class='point'>
            <div class='pointNumber'>${fractalNumber}</div>
            <div class='pointProp'>
                <div>
                    <label>Путь</label><input id='width${fractalNumber}'type="text" value="0.5">
                </div>
                <div>
                    <label>Вероятность</label><input id='probability${fractalNumber}' type="text" value="10">
                </div>
            </div>
        </div>
`
    drawMainPoints();
    save();
}

function save() {
    for(let i =0; i<pointArray.length; i++){
        pointArray[i].width = document.getElementById(`width${i}`).value;
        pointArray[i].probability = document.getElementById(`probability${i}`).value;
    }
}

function startStop() {
    let buttom = document.getElementById('start');
    if(buttom.value == "Start"){
        buttom.value = "Stop";
        start = true;
        startDraw();
    }
    else{
        buttom.value = "Start";
        start = false;
        drawMainPoints();
    }
}

function startDraw() {
    let x = 0;
    let y = 0;
    if(start){
       let interval = setInterval( function () {
            let number =  Math.floor(Math.random() * pointArray.length);
            let chans = Math.floor(Math.random() * 10);
            if(chans<=pointArray[number].probability) {
                x += (pointArray[number].x - x) * pointArray[number].width;
                y += (pointArray[number].y - y) * pointArray[number].width;
                context.fillStyle = '#ffff00';
                context.fill();
                context.fillRect(x, y, lineWidth, lineWidth);
                if (!start) {
                    clearInterval(interval);
                }
            }
        }, 0);
    }
}


canvas.onmousedown = function (event) {
    let x = event.offsetX;
    let y = event.offsetY;

    for(let i=0; i<pointArray.length; i++){
        let p = pointArray[i];
        if(x>p.x && x<p.x+20 && y>p.y && y<p.y+20){
            canvas.onmousemove = function (event) {
                    let x1 = event.offsetX;
                    let y1 = event.offsetY;
                    p.x += (x1-x);
                    p.y += (y1-y);
                    x=x1;
                    y=y1;
                    drawMainPoints();
                    canvas.onmouseup = function () {
                        canvas.onmousemove = null;
                        return;
                    };
            };
        }
    }

};

canvas.onmouseout = function(){
    canvas.onmousemove = null;
};