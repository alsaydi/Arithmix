var QLOG = false;
var ops = ['+','-','*','/','+','+','-'];
function Question(){
    this.num1 = 0;
    this.num2 = 0;
    this.ans  = 0;
    this.op   = 0;
    this.MAX  = 30;
    this.MULT_MAX = 15;
    this.DIV_FACTOR_MAX = 10;
}
Question.prototype.init = function(){
    this.op = (Math.round(Math.random() * ops.length + 1) - 1) % 4;
    if (this.op > 1) { //mult and div
        if (this.op == 2) {
            this.num1 = Math.round(Math.random() * this.MULT_MAX + 1);
            this.num2 = Math.round(Math.random() * this.MULT_MAX + 1);
        } else {
            var factor = 0;
            this.num2 = Math.round(Math.random() * this.MULT_MAX + 1);
            factor = Math.round(Math.random() * this.DIV_FACTOR_MAX + 1);
            this.num1 = this.num2 * factor;
        }
    } else {
        this.num1 = Math.round(Math.random() * this.MAX + 1);
        this.num2 = Math.round(Math.random() * this.MAX + 1);
    }
    if (this.num1 < this.num2 && this.op == 1) { //subtraction
        var temp = this.num1;
        this.num1 = this.num2;
        this.num2 = temp;
    }
    switch(this.op){
        case 0:
            this.ans = this.num1 + this.num2;
            break;
        case 1:
            this.ans = this.num1 - this.num2;
            break;
        case 2:
            this.ans = this.num1 * this.num2;
            break;
        case 3:
            this.ans = this.num1 / this.num2;
            break;
        default:
            console.error('Invalid operation index: %d',this.op);
    }
    if(QLOG){
        console.log("Question is %d %s %d = %d",this.num1,ops[this.op],this.num2,this.ans);
    }
}
Question.prototype.toString = function (){
    var s = this.num1.toString() + ops[this.op].toString() + this.num2.toString() + ' = ' + this.ans.toString();
    return s;	
}