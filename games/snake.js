const canvas = document.getElementById('game1');
const ctx = canvas.getContext("2d");
let button = document.querySelector(".gamebutton");
canvas.width = 500;
canvas.height = 500;
let game = false;
let score = 'x';

button.onclick = function(){
  game=true;
  score = 0;
};

let snakeh = 10;
let snake = [[canvas.width/2,canvas.height/2]];

let food = {
  x: Math.floor(Math.random()*9)*50,
  y: Math.floor(Math.random()*9)*50,
  h: 10
};


let dir;

document.addEventListener('keydown', function controll(event){
  if (event.keyCode==37 && dir!='r'){
    dir='l';
  };
  if (event.keyCode==38 && dir!='d'){
    dir='u';
  };
  if (event.keyCode==39 && dir!='l'){
    dir='r';
  };
  if (event.keyCode==40 && dir!='u'){
    dir='d';
};
});


function drawGame(){
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(food.x,food.y,food.h,food.h);

  ctx.fillStyle = "green";
  for(let i = 0; i < snake.length ; i++){
    ctx.fillRect(snake[i][0],snake[i][1],snakeh,snakeh);

  };

  if(game == false) {
    ctx.fillStyle="rgba(0,0,0,0.9)";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle="white";
    ctx.textAlign = "center";
    ctx.font = "20px sans-serif";
    ctx.fillText(`Нажимай и играй >`, canvas.width - 100, canvas.height / 2);
    ctx.fillText(`твой счёт: `+score, canvas.width / 2, 50);



  };

  if(game == true){
    let snakex= snake[0][0];
    let snakey= snake[0][1];
    snake.pop();

    if(dir == "l") snakex-=snakeh;
    if(dir == "r") snakex+=snakeh;
    if(dir == "u") snakey-=snakeh;
    if(dir == "d") snakey+=snakeh;

    let newSnake=[snakex,snakey];
    snake.unshift(newSnake);

    for(let i = 1; i < snake.length ; i++){
      if(snake[0][0]==snake[i][0] && snake[0][1]==snake[i][1]) {
        snake = [[canvas.width/2,canvas.height/2]];
        game = false;
        dir = '';
        food.x = Math.floor(Math.random()*9)*50;
        food.y = Math.floor(Math.random()*9)*50;
      };
    };
    if(snakex>=canvas.width || snakex<0 || snakey>=canvas.height ||snakey<0){
      snake = [[canvas.width/2,canvas.height/2]];
       game= false;
       dir = '';
       food.x = Math.floor(Math.random()*9)*50;
       food.y = Math.floor(Math.random()*9)*50;
     };

    if(snakex == food.x && snakey == food.y){
      l = snake.length;
      snake.push([snake[l-1][0],snake[l-1][1]]);
      food.x = Math.floor(Math.random()*9)*50;
      food.y = Math.floor(Math.random()*9)*50;
      score++;
    };
};
};
setInterval(drawGame,100);
