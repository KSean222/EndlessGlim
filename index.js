//I think this is possibly the worst code I've ever written in my life.
let canvas;
let glimFront;
let glimSection;
let glimX;
let textElem;
let scrollAcc = 0;

function preload() {
    glimFront = loadImage("./front.png");
    glimSection = loadImage("./section.png");
}

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    glimX = 0;
    textElem = document.getElementById("text");
    imageMode(CENTER);
    rectMode(CENTER);
    strokeWeight(0);
    drawGlim(0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    drawGlim(0);
}

function draw() {
    if (scrollAcc != 0) {
        scrollAcc *= 0.85;
        scrollAcc = scrollAcc < 0 ? Math.ceil(scrollAcc) : Math.floor(scrollAcc);
        drawGlim(scrollAcc);
    }
}

function mouseWheel(event) {
    scrollAcc += event.delta * width / 100;
    return false;
}

function drawGlim(delta) {
    background(255);
    const SEG_H = height * 0.75;
    const SEG_W = SEG_H / glimSection.height * glimSection.width;
    const SEG_TW = SEG_W * 0.99;
    glimX -= delta;
    if (glimX > 0) {
        glimX = 0;
    }
    textElem.style.left = glimX + 5;
    let startX = Math.floor(Math.max(Math.abs(glimX) - width / 2, 0) / SEG_TW);
    let endX = Math.ceil(width / SEG_TW) + 1 + startX;
    const segments = [];
    function makeSegment(index) {
        let x = glimX + width / 2 + SEG_TW * index;
        let y = height / 2;
        segments.push({
            index,
            x,
            y,
        });
    }
    for (let i = endX; i >= startX; i--) {
        makeSegment(i);
    }
    for (const seg of segments) {
        fill((seg.index % 2) ? 180 : 220);
        rect(seg.x, seg.y, SEG_W, height);
    }
    for (const seg of segments) {
        image(seg.index == 0 ? glimFront : glimSection, seg.x, seg.y, SEG_W, SEG_H);
    }
}
