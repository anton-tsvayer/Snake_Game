const cell_field = document.getElementById('cell_field');

for(var i=0; i<100; i++){
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = i.toString();
    cell_field.appendChild(cell);
}

var cells = document.getElementsByClassName('cell');
var snake = [-1, 0];
var direction = 'RG';
var x = -1;
var y = 0;
var speed = 600;

function drawApple(){
    apple = Math.floor(Math.random() * 100);
    if (snake.includes(apple)){
        drawApple();
    }
    else cells[apple].className = 'cell apple';
}

drawApple();

function redraw(){
    // for (var i=0; i<cells.length; i++){
    //     cells[i].className = 'cell';
    // }
    // for (var i=0; i<snake.length; i++){
    //     cells[snake[i]].className = 'cell active_cell';
    // }

    for (var i = 0; i < snake.length; i++){
        console.log(snake[i]);
    }
    console.log('_______________________');

    cells[snake[0]].className = 'cell';
    cells[snake[snake.length-1]].className = 'cell active_cell';

}

var up_btn = document.getElementById('up');
var dw_btn = document.getElementById('down');
var rg_btn = document.getElementById('right');
var lf_btn = document.getElementById('left');

up_btn.addEventListener("mousedown", () => { if (direction != 'DW'){ direction = 'UP'} });
dw_btn.addEventListener("mousedown", () => { if (direction != 'UP'){ direction = 'DW'} });
rg_btn.addEventListener("mousedown", () => { if (direction != 'LF'){ direction = 'RG'} });
lf_btn.addEventListener("mousedown", () => { if (direction != 'RG'){ direction = 'LF'} });

window.addEventListener('keydown', snakeControl);

function snakeControl(event){
    let key = event.key;

    key === 'ArrowLeft' && direction != 'RG'
    ? direction = 'LF'
    : key === 'ArrowUp' && direction != 'DW'
    ? direction = 'UP'
    : key === 'ArrowRight' && direction != 'LF'
    ? direction = 'RG'
    : key === 'ArrowDown' && direction != 'UP'
    ? direction = 'DW'
    : console.log('PASS');
}

function headCord(){
    direction === 'RG'
    ? (++x > 9 ? x = 0 : x)
    : direction === 'UP'
    ? (--y < 0 ? y = 9 : y)
    : direction === 'LF'
    ? (--x < 0 ? x = 9 : x)
    : direction === 'DW'
    ? (++y > 9 ? y = 0 : y)
    : console.log('PASS');
}

function snakeFormation(){
    countScore();
    headCord();
    inspect();
    snake.push(y*10 + x);
    if (apple == y*10 + x){
        console.log('eat');
        drawApple();
        speed-=5;
    }
    else snake.shift();
    redraw();
}

function inspect(){
    function check(head){
        if(snake.includes(head) && 
        head != snake[0]) location.reload();
    }
    direction === 'RG'
    ? check(y*10+(x+1))
    : direction === 'UP'
    ? check((y-1)*10+x)
    : direction === 'LF'
    ? check(y*10+(x-1))
    : direction === 'DW'
    ? check((y+1)*10+x)
    : console.log('PASS');
}

function countScore(){
    var score = document.getElementById('score');
    score.innerHTML = "Score: " + (snake.length-1).toString();
}


function timer(){
    setInterval(snakeFormation, 300);
}

timer();