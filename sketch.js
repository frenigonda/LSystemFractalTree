// >>also see: barnsley fern
// variables: XF
// constants: +-[]
// axiom: X
// rules: (X -> F+[[X]-X]-F[-FX]+X), (F -> FF)

// Here is an L-System fractal tree

let axiom = "X";
let rules = [];
var sentence = axiom;
var leng = 120;
var angle;
var count = 0;

// Rules, by wich the recursion works:
rules[0] = {
  a: "X",
  b: "F+[[X]-X]-F[-FX]+X"
}
rules[1] = {
  a: "F",
  b: "FF"
}

// Generate new sentence according to recursion rules:
function generate() {
  // With every new sentence we want to make tree branches smaller
  leng = 0.5*leng;
  // We also want to randomize angle a bit
  angle += random(-PI/9, PI/9);
  var newSentence = "";
  // Every character in sentence we need to change according to recursion rules and
  // write it dow to a new sentence
  for (var c in sentence) {
    let current = sentence.charAt(c);
    var found = false;
    for (var r in rules) {
      if (current == rules[r].a) {
        newSentence += rules[r].b;
        found = true;
        break;
      }
    }
    if (!found) {
      newSentence += current;
    }
  }
  sentence = newSentence;
  drawSentence();
}

// Draw new sentence
function drawSentence() {
  var countX = 0;
  resetMatrix();
  translate(width / 2, height);
  background(0);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current == "F") {
      colorMode(HSB);
      stroke(150, countX%255, 255);
      line(0, 0, 0, -leng);
      translate(0, -leng);
      countX++;
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
  countX = 0;
}

function setup() {
  createCanvas(400, 400);
  background(0);
  drawSentence();
  angle = PI/6;
}

function mousePressed() {
  if (count === 7) {
    sentence = axiom;
    drawSentence();
    count = 0;
    leng = 120;
    angle = PI/6;
  } else {
    count++;
    generate();
  }
}

function draw() {
  let t = 'press mouse';
  colorMode(RGB);
  fill(50);
  noStroke();
  text(t, 10, 10, 100, 30);
}
