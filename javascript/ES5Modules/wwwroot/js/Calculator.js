var myNamespace;

myNamespace = (function(ns) {
    function calculator() {
    }

    calculator.prototype = {
        add: function(op1, op2) {
            return op1 + op2;
        }
    };
    
    ns.Calculator = calculator;
    return ns;
}(myNamespace || {}))

exports.myNamespace = myNamespace;