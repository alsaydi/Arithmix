function Wall(strength,x) {
    this.strength = strength;
    this.x = x;
}
Wall.prototype.getX = function(){
    return this.x;
}