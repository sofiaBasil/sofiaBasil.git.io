
//game variables
let score = 0;
let started=false;
let game_over = false;
let last_counted = "";

//motion variables (physics)
let g = -9.8
let vy = 0.0;
let t = 0.0;
let y = 100;
let y0 = 50.0;

//Multiplier for gravity ()
g*=100;

//pipes
const d_pipe = 35;
const w_pipe  = 15;
const speed_pipe = 0.45;
const spacing_pipe = 30;
let pipes = []
let pipes_dom = []
let pipe_id = 0;

//init
$("#bird").css("bottom", 50 + "vh")

//keypress
$(window).keypress((e) => {
    if(e.key === ' ' || e.key === 'Spacebar') {jump();}
})
$(document).mousedown(() => {
    if(!game_over) {jump()};
})

function gameStart() {
    score = 0;
    started=false;
    game_over = false;
    last_counted = "";
    pipes = [];
    pipes_dom = []
    pipe_id = 0;

    $("#game").empty();
    $("#game").append('<div id="bird"></div>');

    $("#game-over").css("visibility", "hidden");

    //Initialize some pipes
    for(let i = 0; i < 4; i++) {
        pipe_id++;
        pipes.push({'h':getRandomPipeHeight(), 'x':100 + (i*spacing_pipe), 'id':'pipe-' + pipe_id});
        addPipeToDocument(pipes[i]);
    }
    gameLoop();
}

//Game Loop
function gameLoop() {
    
    //get inputs

    //update variables
    t+=0.01;
    y = (0.5)*g*(t*t) + vy*t + y0
    y = y < 0? 0 : y;
    
    let bird = document.querySelector("#bird");

    if(!game_over && started) {
        for(let i=0; i < pipes.length; i++) {
            let pipe = pipes[i];

            //check for collisions
            let pipe_bot = document.querySelector("#" + pipe["id"] + "-bot");
            let pipe_top = document.querySelector("#" + pipe["id"] + "-top");
            
            if(collided(bird, pipe_top) || collided(bird, pipe_bot)) {
                game_over = true;
                $("#bird").css("z-index", "5");
            }

            //Manage the pipes
            if( pipe['x'] < -1*w_pipe ) {
                removePipeFromDocument(pipe["id"]);
                pipe_id++;
                pipes[i] = {'h':getRandomPipeHeight(), 'x':100+w_pipe, 'id':'pipe-' + pipe_id}
                addPipeToDocument(pipes[i]);
            } else {
                pipe['x'] -= speed_pipe;
            }

            if(pipe['x'] < 5 && pipe['id'] != last_counted)
            {
                last_counted = pipe['id'];
                score++;
                $("#score").html(score);
            }
        }
    }
    
    if (!started) {
        //if(y == 0){console.log(t);}
        if(y < 45) {
            t = 0.0;
            vy = 175.0;
            y0 = y;
        }
    }
    //redraw
    //redraw bird
    $("#bird").css("bottom", y + "vh")
    
    //redraw the pipes
    for(let i=0; i < pipes.length; i++) {
        let pipe=pipes[i];
        $("#" + pipe["id"] + "-top").css("left", pipe["x"] + "vw");
        $("#" + pipe["id"] + "-bot").css("left", pipe["x"] + "vw");
    }
    
    if(!game_over || y > 0) {
        setTimeout(gameLoop, 10);
    } else {
        gameOver();
    }
}

function addPipeToDocument(pipe) {
    $("#game").append("<div id='"+ pipe["id"] + "-top'></div>");
    $("#game").append("<div id='"+ pipe["id"] + "-bot'></div>");

    $("#" + pipe["id"] + "-top").attr("class", "pipe");
    $("#" + pipe["id"] + "-bot").attr("class", "pipe");

    $("#" + pipe["id"] + "-top").css("bottom", (20 + (d_pipe/2) + pipe["h"]) + "vh");
    $("#" + pipe["id"] + "-bot").css("bottom", (-70 + 20 - (d_pipe/2) + pipe["h"]) + "vh");

    $("#" + pipe["id"] + "-top").css("left", pipe["x"] + "vw");
    $("#" + pipe["id"] + "-bot").css("left", pipe["x"] + "vw");

    $("#" + pipe["id"] + "-top").css("width", w_pipe + "vh");
    $("#" + pipe["id"] + "-bot").css("width", w_pipe + "vh");
}

function removePipeFromDocument(id) {
    $("#" + id + "-top").remove();
    $("#" + id + "-bot").remove();
}

function getRandomPipeHeight() {
    return (Math.floor((Math.random() * 10) + 1)*5);
}

function collided(el1, el2) {
    let l = (el1.offsetLeft < el2.offsetLeft + el2.offsetWidth && 
            el1.offsetLeft + el1.offsetWidth > el2.offsetLeft &&
            el1.offsetTop < el2.offsetTop + el2.offsetHeight &&
            el1.offsetHeight + el1.offsetTop > el2.offsetTop)
    return l;
}

//Jump
function jump() {
    if(!game_over)
    {
        t = 0.0;
        vy = 175.0;
        y0 = y;
    }
    if(!started) {
        started = true;
    }
    if(started && game_over) {
        started = false;
        game_over = false;
        gameStart();
    }
}

function gameOver() {
    //TODO: Popup "Game Over" Screen
    //      Button to restart game
    // Jquery finds game-over element and makes it visible
    $("#game-over").css("visibility", "visible");
    //alert("you are terrible, you list");
}

gameStart();