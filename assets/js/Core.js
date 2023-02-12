let ril = [];
let cardpos = [{x:726, y:268},{x:907, y:268},{x:1086, y:268},{x:726, y:437},{x:907, y:437},{x:1086, y:437}];
let repeat = 50;
let score = 0;
let gameState = "ready";

window.onresize = () => {
    init();
}

function setRepeat(_r) {
    repeat = _r;
    return true;
}

function start() {
    suffle();
    return true;
}

function getGameState() {
    return gameState;
}

function updateScore(_s) {
    score += _s;
    $('#score').html(`${score} P`);
    console.log('total score = ' + score);
    return true;
}

function calcResult(a, b, c) {
    
    let s = 0; 
    let k = a;
    if(a == b && b == c) {
        s = 100;
    } if(a==b || b==c || a==c) {
        s = 50;
        if(b == c) {
            k = b;
        }
    }
    if(k == 8) {
        s *= 10;
    } else if(k >= 11 && k<=13) {
        s *= 2;
    } else if(k>=14) {
        s *= 3;
    }
    console.log(`calc result a=${a}, b=${b}, c=${c}, _s=${s}`);
    blink();
    updateScore(s);            
    return true;
}

function init() {
    loadback();
    loadMachine();
    loadBtn();
    initRil();
    initCard();
    loadScore();
}

function loadScore() {
    let rw = window.innerWidth / 1920;
    let rh = window.innerHeight / 1080;
    let w = 521 * rw; 
    let h = 136 * rh;
    let x = 704 * rw;
    let y = 119 * rh;
    $('#score').attr('width', `${w}px`);
    $('#score').attr('height', `${h}px`);
    $('#score').css('left', `${x + (w/3)}px`);
    $('#score').css('top', `${y + (h/8)}px`);
    $('#score').css('font-size', `${h/2}px`);
}

function loadMachine() {
    $('#machine').width(window.innerWidth);
    $('#machine').height(window.innerHeight);

    $('#machine_light').width(window.innerWidth);
    $('#machine_light').height(window.innerHeight);
    $('#machine_light').hide();
}

function blink() {
    let m1 = ()=> {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                $('#machine').hide();
                $('#machine_light').show();
                resolve(true);
            }, 1000); 
        });
    };

    let m2 = ()=> {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                $('#machine_light').hide();
                $('#machine').show();
                resolve(true);
            }, 1000); 
        });
    };

    m1().then(()=>m2())
    .then(()=>m1())
    .then(()=>m2())
    .then(()=>m1())
    .then(()=>m2())
    .then(()=>m1())
    .then(()=>m2());
    return true;
}

function loadback() {
    $('#back').width(window.innerWidth);
    $('#back').height(window.innerHeight);
}

function loadBtn() {
    $('#btn').width(window.innerWidth);
    $('#btn').height(window.innerHeight);
    $('#btn_down').width(window.innerWidth);
    $('#btn_down').height(window.innerHeight);
    $('#btn_down').hide();

    $('#btn').click(()=>{
        if(gameState !== "ready") {
            return;
        }
        gameState = "start";
        start();
        $('#btn').hide();
        $('#btn_down').show();
        setTimeout(()=>{
            $('#btn').show();
            $('#btn_down').hide();
        }, 500);

    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function initCard() {
    $('#cards').html("");
    for(var i=0;i<6;i++) {
        let rw = window.innerWidth / 1920;
        let rh = window.innerHeight / 1080;
        let w = 107 * rw;
        let h = 169 * rh;
        let x = cardpos[i].x * rw;
        let y = cardpos[i].y * rh;
        $('#cards').append(`<img id="card${i}" src="./assets/img/s${ril[i]}.png" width="${w}px" height="${h}px">`);
        $(`#card${i}`).css('position', 'absolute');
        $(`#card${i}`).css('left', `${x}px`);
        $(`#card${i}`).css('top', `${y}px`);
    }
}

function suffle() {

    setTimeout(()=>{
        moveCard(1, 1, repeat);
        setTimeout(()=>{
            moveCard(2, 1, repeat);
            setTimeout(()=>{
                moveCard(3, 1, repeat);
            }, 700);
        }, 700);
    }, 100);
}

function moveCard(r, current, repeat) {
    if(current > repeat) {
        if(r == 3) {
            gameState = "ready";
            calcResult(ril[3], ril[4], ril[5]);
        }
        return;
    }
    let rh = window.innerHeight / 1080;
    let offset = 169 * rh;
    let duration = current / repeat * 250;
    
    let t = $(`#card${r+2}`).css('top');
    t = parseInt(t.replace('px', ''));
    t+=offset;
    $(`#card${r+2}`).animate({top:t}, duration, ()=>{

    });

    let t2 = $(`#card${r-1}`).css('top');
    t2 = parseInt(t2.replace('px', ''));
    t2+=offset;
    $(`#card${r-1}`).animate({top:t2}, duration, ()=>{
        drawCard(r);
        moveCard(r, current + 1, repeat);
    });
}

function drawCard(r) {
    generateRil(r);
    let rw = window.innerWidth / 1920;
    let rh = window.innerHeight / 1080;
    let x1 = cardpos[r-1].x * rw;
    let y1 = cardpos[r-1].y * rh;
    $(`#card${r-1}`).attr('src', `./assets/img/s${ril[r-1]}.png`);
    $(`#card${r-1}`).css('left', `${x1}px`);
    $(`#card${r-1}`).css('top', `${y1}px`);

    let x2 = cardpos[r+2].x * rw;
    let y2 = cardpos[r+2].y * rh;

    $(`#card${r+2}`).attr('src', `./assets/img/s${ril[r+2]}.png`);
    $(`#card${r+2}`).css('left', `${x2}px`);
    $(`#card${r+2}`).css('top', `${y2}px`);

}

function initRil() {
    for(var i=0;i<6;i++) {
        ril.push(getRandomInt(1, 17));
    }
}

function generateRil(r) {
    ril[r + 2] = ril[r - 1];
    ril[r - 1] = getRandomInt(1, 17);
}