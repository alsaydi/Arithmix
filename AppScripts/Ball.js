var BLOG = false;
function Ball(elementId, initialX, initialY, pixelPerTimeUnit, repaintSpeed, wall, question) {
    this.elementId = elementId;
    this.htmlElement = document.getElementById(elementId);
    this.pixelPerTimeUnit = pixelPerTimeUnit;
    this.repaintSpeed = repaintSpeed;
    this.wall = wall;
    this.question = question;
    this.solved = false;
    this.pause = false;
    this.htmlElement.ballObject = this;
    this.traveling = true;
//    this.htmlElement.onkeypress = function (sender) { alert(sender);console.log(sender);sender.ballObject.checkSolution(); };
}
Ball.prototype.announceCollision = function () {
    if(BLOG)
        console.log("ball collided with wall before being solved.");
}
Ball.prototype.isSolved = function () {
    return this.solved;
}
Ball.prototype.moveTo = function (x) {
    var currentX = this.htmlElement.getBoundingClientRect().left;
    var newX = currentX + this.pixelPerTimeUnit;
    this.htmlElement.style.left = newX.toString() + "px";
    var collided = newX >= this.wall.getX();
    return collided;
}
/*Ball.prototype.travel = function(){
    var travelIntervalId = setInterval(function (pBall) {
        if (!pBall.isSolved()) {
            pBall.traveling = true;
            var collided = pBall.moveTo(pBall.wall.getX());
            if (collided) {
                pBall.traveling = false;
                clearInterval(travelIntervalId);
                pBall.announceCollision();
                console.log("cleared travel interval due to collision: %d", travelIntervalId);

            }
        } else {
            clearInterval(travelIntervalId);
            if (BLOG || true) {
                console.log("cleared travel interval due to solution: %d",travelIntervalId);
            }
        }
    }, this.repaintSpeed, this);
}*/
Ball.prototype.solve = function () {
    if (BLOG) {
        console.log(this.elementId + " solved.");
    }
    if (this.htmlElement) {
        this.htmlElement.parentNode.removeChild(this.htmlElement);
        this.solved = true;
    }
    else {
        if (BLOG) {
            console.error("attempting to remove a null element");
        }
    }
}
Ball.prototype.isTraveling = function () {
    return this.traveling;
}
Ball.prototype.checkSolution = function (answer) {
    return this.question.ans === answer;
}