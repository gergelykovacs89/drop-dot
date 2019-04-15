const http = require("http");
const fs = require("fs");

http
  .createServer((request, response) => {
    if (request.url === "/") {
      sendFileContent(response, "index.html", "text/html");
    } else if (/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())) {
      sendFileContent(
        response,
        request.url.toString().substring(1),
        "text/javascript"
      );
    } else if (/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())) {
      sendFileContent(
        response,
        request.url.toString().substring(1),
        "text/css"
      );
    } else if (request.url === "/balls" && request.method == "POST") {
      let jsonString = "";
      request.on("data", function(data) {
        jsonString += data;
      });
      request.on("end", function() {
        let color = handleRequest(JSON.parse(jsonString));
        response.write(color);
        response.end();
      });
    } else {
      console.log("Requested URL is: " + request.url);
      response.end();
    }
  })
  .listen(3000);

const sendFileContent = (response, fileName, contentType) => {
  fs.readFile(fileName, function(err, data) {
    if (err) {
      response.writeHead(404);
      response.write("Not Found!");
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.write(data);
    }
    response.end();
  });
};

const handleRequest = numBallsJson => {
  let numBalls = numBallsJson.numBalls;
  if (numBalls === 0) {
    return "pink";
  } else if (divByThree(numBalls)) {
    return "green";
  } else if (divByFive(numBalls)) {
    return "blue";
  } else if (divByFifTeen(numBalls)) {
    return "purple";
  } else {
    return "pink";
  }
};

const divByThree = numBalls => {
  return (numBalls + 1) % 3 === 0 && (numBalls + 1) % 5 !== 0;
};

const divByFive = numBalls => {
  return (numBalls + 1) % 3 !== 0 && (numBalls + 1) % 5 === 0;
};

const divByFifTeen = numBalls => {
  return (numBalls + 1) % 3 === 0 && (numBalls + 1) % 5 === 0;
};
