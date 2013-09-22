var GLOG = false;
function Game(startWall, endWall, ballHeight,ballsFrequency) {
    this.startWallElement = startWall;
    this.endWallElement = endWall;
    this.startX = this.startWallElement.getBoundingClientRect().left;
    this.startWallTop = Math.round( this.startWallElement.getBoundingClientRect().top);
    this.startWallHeight = Math.round(this.startWallElement.getBoundingClientRect().height);
    this.ballHeight = ballHeight;
    this.ballCounter = 0;
    this.ballsFrequency = ballsFrequency;
    this.travelingBalls = new Array();
    this.solvedBalls = new Array();
}
Game.prototype.start = function () {
    this.sendBall();
    var startIntervalId = setInterval(function (pGame) {
        pGame.sendBall();
    }, this.ballsFrequency, this);
}
Game.prototype.sendBall = function(){
    var b = document.createElement("div");
    b.id = "b" + this.ballCounter.toString();
    this.ballCounter++;
    b.className = "ball";
    var x = this.startX;
    var yStart = this.startWallTop;
    var yEnd = this.startWallHeight - this.ballHeight;
    var y = Math.round(Math.random() * yEnd + yStart);
    if (y < yStart) {
        if(GLOG){
            console.error("y < yStart %d %d", y, yStart);
        }
        y = yStart;
    } else if (y > yEnd) {
        if(GLOG){
          console.error("y > yEnd %d %d", y, yEnd);
        }
        y = yEnd;
    }
    if(GLOG){
        console.log("yStart: %d yEnd %d rand Y", yStart, yEnd, y);
    }
    b.style.left = x.toString() + "px";
    b.style.top = y.toString() + "px";
    document.body.appendChild(b);
    var question = new Question();
    question.init();
    var qtxt = question.num1.toString() +"<br />"+ ops[question.op].toString() +"<br />"+ question.num2.toString();
    b.innerHTML = qtxt;
    var destX = document.getElementById("wall").getBoundingClientRect().left;
    var pixelsPerTimeUnit = 1;
    var repaintSpeed = 20;
    var ball = new Ball(b.id, x, y, pixelsPerTimeUnit, repaintSpeed, new Wall(10, destX), question);
    ball.travel();
    this.travelingBalls.push(ball);
}
Game.prototype.checkSolution = function (answer) {
    for (var i = 0; i < this.travelingBalls.length; i++) {
        if (this.travelingBalls[i].isTraveling()) {
            if (this.travelingBalls[i].checkSolution(answer)
                && !this.travelingBalls[i].isSolved()) {
                this.solvedBalls.push(this.travelingBalls[i]);
                this.travelingBalls[i].solve();
            }
        }
    }
}