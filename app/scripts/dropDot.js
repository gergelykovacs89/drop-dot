const numBallsHtml = document.getElementById("numBalls");
const scoreHtml = document.getElementById("score");
const ballList = document.getElementById("ball-list");
let numBalls = 0;
let score = 0;

numBallsHtml.innerHTML = numBalls;
scoreHtml.innerHTML = score;

const sendBalls = () => {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/balls", true);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onreadystatechange = function() {
    var DONE = 4;
    var OK = 200;
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        handleResponse(xhr.responseText);
      } else {
        console.log("Error: " + xhr.status);
      }
    }
  };

  xhr.send(JSON.stringify({ numBalls: numBalls }));
};

const handleResponse = color => {
  switch (color) {
    case "pink":
      score += 1;
      handleDrop(color);
      break;
    case "green":
      score += 3;
      handleDrop(color);
      break;
    case "blue":
      score += 5;
      handleDrop(color);
      break;
    case "purple":
      score += 15;
      handleDrop(color);
      break;
  }
};

const handleDrop = color => {
  numBalls++;
  let ballItem = document.createElement("li");
  ballItem.className = "ball-item";
  ballList.appendChild(ballItem);

  let ball = document.createElement("div");
  ball.className = "ball";
  ball.style.backgroundColor = color;
  ballItem.appendChild(ball);

  numBallsHtml.innerHTML = numBalls;
  scoreHtml.innerHTML = score;
};
