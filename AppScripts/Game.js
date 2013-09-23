var GLOG = false;
function Game(startWall, endWall, ballHeight, ballsFrequency
    , correctCallback , incorrectCallback) {
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
    this.destX = this.endWallElement.getBoundingClientRect().left;
    this.collidedBalls = new Array();
    this.correctCallBack = correctCallback;
    this.incorrectCallback = incorrectCallback;
    this.pause = false;
    this.stop = false;
}
Game.prototype.start = function () {
    this.sendBall();
    var startIntervalId = setInterval(function (pGame) {
        if (pGame.stop) {
            clearInterval(startIntervalId);
        }
        pGame.sendBall();
    }, this.ballsFrequency, this);
    var repaintSpeed = 1;
    var moveIntervalId = setInterval(function (pGame) {
        if (pGame.stop) {
            clearInterval(moveIntervalId);
        }
        for (var i = 0; i < pGame.travelingBalls.length; i++) {
            var ball = pGame.travelingBalls[i];
            if (ball && ball.isTraveling() && !ball.isSolved()) {
                var collided = ball.moveTo(pGame.destX);
                if (collided) {
                    pGame.collidedBalls.push(ball);
                    pGame.travelingBalls.splice(i, 1);
                }
            }
        }
    }, repaintSpeed, this);
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
    var destX = this.endWallElement.getBoundingClientRect().left;
    var pixelsPerTimeUnit = 1;
    var repaintSpeed = 20;
    var ball = new Ball(b.id, x, y, pixelsPerTimeUnit, repaintSpeed, new Wall(10, destX), question);
    //ball.travel();
    this.travelingBalls.push(ball);
    var collided = ball.moveTo(this.destX);
}
Game.prototype.checkSolution = function (answer) {
    var correct = false;
    for (var i = 0; i < this.travelingBalls.length; i++) {
        if (this.travelingBalls[i].isTraveling()) {
            if (this.travelingBalls[i].checkSolution(answer)
                && !this.travelingBalls[i].isSolved()) {
                this.solvedBalls.push(this.travelingBalls[i]);
                this.travelingBalls[i].solve();
                this.travelingBalls.splice(i, 1);
                correct = true;
            }
        }
    }
    return correct;
}
Game.prototype.pauseGame = function () {
    this.pause = true;
}
Game.prototype.resumeGame = function () {
    this.pause = false;
}
Game.prototype.stopGame = function () {
    this.stop = true;
}
