const confi_canvas = {
    all: true,
    limitwidth: 16,
    limitheight: 9,
    background: "url('./img/canvas_back.png')"
}
const confi_chara = {
    size: 10,
    speed: 5,
    color: "rgba(50, 50, 130, .9)",
    hp: 100,
    shot: {
        damage: 5,
        sped: 8,
        size: 3,
        color: "white"
    },
    sub: {
        size: 5,
        color: "rgba(20, 20, 20, .8)"
    }
}
const confi_zyako = {
    color: "green",
    size: 8,
    speed: 5
}

//Data on Play-----------------------------------
let canvas = {
    height: 0,
    width: 0,
    all: undefined,
    background: undefined
}
let run = true;
let fps = 100 / 100;
let chara = {
    x: 0,
    y: 0,
    size: 0,
    speed: 0,
    color: undefined,
    hp: 0,
    shot: {
        0: {
            x: 0,
            y: 0,
            damage: 0,
            size: 0,
            color: 0
        }
    },
    sub: {
        0: {
            x: 0,
            y: 0,
            size: 0,
            color: 0
        },
        1: {
            x: 0,
            y: 0,
            size: 0,
            color: 0
        }
    }
}
let zyako = [];

//Functions--------------------------------------
window.addEventListener("load", start);
window.addEventListener("load", main);
window.addEventListener("load", draw);

function start() {
    canvas.all = confi_canvas.all;
    if (canvas.all) {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
    } else {
        if (window.innerWidth / window.innerHeight >= confi_canvas.limitwidth / confi_canvas.limitheight) {
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientWidth * confi_canvas.limitwidth / confi_canvas.limitheight;
        } else {
            canvas.height = document.documentElement.clientHeight;
            canvas.width = document.documentElement.clienHeight * confi_canvas.limitheight / confi_canvas.limitwidth;
        }
    }
    screenCanvas = document.getElementById('screen');
    ctx = screenCanvas.getContext('2d');
    canvas.background = confi_canvas.background;

    chara.size = confi_chara.size;
    chara.speed = confi_chara.speed;
    chara.color = confi_chara.color;
    chara.hp = confi_chara.hp;
    chara.x = canvas.width / 2;
    chara.y = canvas.height * 3 / 4;
}

function main() {
    if (run) {
        draw();
        requestAnimationFrame(main)
    };
}

function draw() {
    Derie("#screen")[0].style.width = canvas.width + "px";
    Derie("#screen")[0].style.height = canvas.height + "px";
    if (~canvas.background.indexOf("url")) {
        Derie("#screen")[0].style.backgroundImage = canvas.background;
    } else {
        Derie("#screen")[0].style.background = canvas.background;
    }

    ctx.fillStyle = String(chara.color);
    // console.log(ctx.fillStyle)
    ctx.beginPath();
    ctx.arc(chara.x, chara.y, chara.size, 0, Math.PI * 2, false);
    ctx.fill();
}