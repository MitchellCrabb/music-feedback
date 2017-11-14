var song;
var volx;
var voly;
var pann;
var amp;



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  song = loadSound('https://www.openprocessing.org/sketch/473052/files/ChillPill.mp3', loaded);
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.9, 128);
}

function loaded() {
  song.play();
}

function draw() {
 ;
  var spectrum = fft.analyze();
  var volb = fft.getEnergy("bass");
  var vol = amp.getLevel();
  var bass = map(volb, 0, 255, 150, 400);
  rotateX(frameCount * 0.015);
  rotateY(frameCount * 0.01);

  if(mouseX <= width/2){
  vlr = map(mouseX, 0., width/2, 0.1, 1);
    clf = map(mouseX, 0., width/2, 0, 255);
    blf = map(mouseX, 0., width/2, 200, 50);
    var llf = map(mouseX, 0., width/2, 100, 200);
  } else if (mouseX > width/2) {  
  vlr = map(mouseX, width/2, width, 1, 0.1);
    clf= map(mouseX, width/2, width, 255, 0);
    blf = map(mouseX, width/2, width, 50, 200);
    var llf = map(mouseX, width/2, width, 200, 100);
  } else { volx = 0.1; }
  
  if (mouseY <= height/2) {
    vup= map(mouseY, 0., height/2, 0.1, 1);
  	cup= map(mouseY, 0., height/2, 0, 255);
    bup= map(mouseY, 0., height/2, 200, 50);
    var lup= map(mouseY, 0., height/2, 100, 200);
  } else if(mouseY > height/2) {
    vup=map(mouseY, height/2, height, 1, 0.1);
    cup=map(mouseY, height/2, height, 255, 0);
    bup=map(mouseY, height/2, height, 50, 200);
    var lup=map(mouseY, height/2, height, 200, 100);
  }	else { volx = 0.1; }
  bup = bup*1.5;
  b = (bup+blf)/1.1;
  c = (cup+clf)/2;
  var level = (llf+lup)/2
  var d = (bass+(level/2))/2;
  background(b,255,b);
  noStroke();
  fill(color('hsba(0, 0%, 95%, 0.8)'));
  //tint(255, 127);
  volx = (vlr+vup)/2;
  box(d, d, d);
  song.setVolume(volx);
  pann = map(mouseX, 0., width, 0.4, -0.4);
  song.pan(pann);
}