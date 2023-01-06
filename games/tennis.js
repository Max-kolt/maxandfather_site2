const canvas = document.getElementById('game1');
const ctx = canvas.getContext("2d");
let button = document.querySelector(".gamebutton");
canvas.width = 450;
canvas.height = 580;

let game = false;

 let bot={
  x:150  ,
  y:10,
  width:150,
  height:20,
  score:0
};

let ball={
  x:canvas.width /2,
  y:canvas.height /2,
  radius:15,
  speedx: Math.random(),
  speedy: Math.random(),

};


if (ball.speedy < 0.5){
  ball.speedy = -3;
};

if (ball.speedy >= 0.5){
  ball.speedy = 3;
};

if (ball.speedx < 0.5){
  ball.speedx = -3;
};

if (ball.speedx >= 0.5){
  ball.speedx = 3;
};

let plat={
  x:150,
  y:550,
  width:150,
  height:20,
  score:0
};





button.onclick = function(){
  game=true;
};



function botmove(){
  if(ball.y>= canvas.height/2 && bot.x+bot.width/2 != canvas.width/2){
    if(bot.x+bot.width/2 >canvas.width/2) bot.x--;
    if(bot.x+bot.width/2 <canvas.width/2) bot.x++;
  };
  if(ball.y<canvas.height/2){
    if(ball.x>bot.x+bot.width-bot.width/3 && bot.x+bot.width<canvas.width)bot.x=bot.x+3;
    if(ball.x<bot.x+bot.width/3 && bot.x > 0)bot.x=bot.x-3;
  };

};
let time1=0;
let time2=0;
let keycontroll;

document.addEventListener("keydown", function controll(e){
  if (game == true){
    if (e.keyCode == 37 && plat.x>0){
      keycontroll = 'left';
    };
    if (e.keyCode == 39 && plat.x < canvas.width-plat.width){
      keycontroll = 'right';
    };


  };

});

document.addEventListener("keyup", function uncontroll(e){
  keycontroll = 'none';
});

let fin = "Битва";
let ending;
function drawGame(){


  ctx.fillStyle="black";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0,canvas.height / 2 - 1,canvas.width,2);
  ctx.fillRect(bot.x,bot.y,bot.width,bot.height);
  ctx.fillRect(plat.x,plat.y,plat.width,plat.height);
  ctx.beginPath();
  ctx.fillStyle = "grey";
  ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
  ctx.fill();
  ctx.font = "20px sans-serif";
  ctx.fillText(String(bot.score),canvas.width-20,canvas.height / 2 -20);
  ctx.fillText(String(plat.score),canvas.width-20,canvas.height / 2 + 35);


  botmove();
  if (game == false){
    ctx.fillStyle="rgba(0,0,0,0.9)";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle="white";
    ctx.textAlign = "center";
    ctx.font = "20px sans-serif";
    ctx.fillText(`Нажимай и играй >`, canvas.width - 100, canvas.height / 2);
    ctx.fillText(fin, canvas.width / 2, 50);

  };

  if (game == true){
    ball.y=ball.y+ball.speedy;
    ball.x=ball.x+ball.speedx;

  if(keycontroll == 'left' && plat.x > 0)plat.x = plat.x-3;
  if(keycontroll == 'right' && plat.x < canvas.width-plat.width)plat.x = plat.x+3;


  if(ball.x <= 20) {
    ball.speedx = -ball.speedx;
  };
  if(ball.x >= canvas.width-ball.radius) {
    ball.speedx = -ball.speedx;

  };
  if(plat.x<=ball.x && plat.x+plat.width>=ball.x && plat.y<ball.y+ball.radius && plat.y+6>ball.y+ball.radius){
    ball.speedy=-ball.speedy;
    ball.y=plat.y-ball.radius-1;
    time1++;
  };
  if(bot.x<=ball.x && bot.x+bot.width>=ball.x && bot.y+bot.height>ball.y-ball.radius && bot.y+bot.height-6<ball.y-ball.radius){
    ball.speedy=-ball.speedy;
    ball.y=bot.y+bot.height+ball.radius+1;
    time1++;
  };


  if (ball.speedx<6 || ball.speedx>-6 && ball.speedy<5 || ball.speedy > -5){
    if (time1-time2==5){
      time2=time1;
      if (time2<5){

        if(ball.speedy<0)ball.speedy--;
        if(ball.speedy>0)ball.speedy++;
      };
      if(time2>=5){
        if(ball.speedy<0) ball.speedy--;
        if(ball.speedy>0) ball.speedy++;
        if(ball.speedx<0) ball.speedx--;
        if(ball.speedx>0) ball.speedx++;


      };
      };
    };




  if (ball.y<0) {
    time1=0;
    time2=0;
    plat.score++;
    plat.x = 150;
    bot.x = 150;
    ball.x = canvas.width /2;
    ball.y = canvas.height / 2;
    ball.speedx = -3;
    ball.speedy = -3;
  };
  if (ball.y>canvas.height){
    time1=0;
    time2=0;
    bot.score++;
    plat.x = 150;
    bot.x = 150;
    ball.x = canvas.width /2;
    ball.y = canvas.height / 2;
    ball.speedx = 3;
    ball.speedy = 3;
  };
};

if (bot.score == 3 || plat.score == 3){
  bot.score = 0;
  plat.score = 0;
  time1=0;
  time2=0;
  plat.x = 150;
  bot.x = 150;
  ball.x = canvas.width /2;
  ball.y = canvas.height / 2;
  ball.speedx = 3;
  ball.speedy = 3;
  game = false;

};
  if(bot.score>plat.score){
    fin = "Ты проиграл";
  };
  if(bot.score<plat.score) {
    fin = "Ты победил";
  };

};

setInterval(drawGame,20);
