'use strict';

class Node {
	constructor(inputs) {
		this.w = [];
		this.p = null; //record of inputs
		this.o = null; // output value
		this.ALPHA = 10;
	    for(var i = 0; i < inputs; i++){
	    	this.w.push(Math.floor(Math.random()*3)-1);
	    }
	}
    processInput(input) {
        this.p = input;
        var sum = this.w.reduce(function(prev, curr, i){
            return prev + (curr * input[i]);
        }, 0)
        this.o = 1/(1+Math.pow(Math.E, -sum));;
    }
    update(error){
    	error = error * this.ALPHA;
        this.w.forEach((weight, i) => {
            this.w[i] -= (this.p[i] * error);
        })
    }
}

class Network {
	constructor(inputs, layer, output){
		this.layer = [];
		for(var l = 0; l < layer; l++){
			this.layer.push(new Node(inputs));
		}

	  	this.output = [];
	  	for(var o = 0; o < output; o++){
			this.output.push(new Node(layer));
		}
	}
    input(arr){
        this.layer.forEach((node, i) => {
        	this.layer[i].processInput(arr);
        })
        var outputs = this.layer.map(function(node){
        	return node.o;
        })
        this.output.forEach((node, i) => {
        	this.output[i].processInput(outputs);
        })
        return [this.output[0].o, this.output[1].o]    
    }
    train(expected){
    	var errors = this.output.map((node, i) => {
    		var d = delta(expected[i], node.o);
    		this.output[i].update(d);
    		return d;
    	})

        var backwardErrors = this.output.map(function(node, i){
        	return multiply(node.w.slice(),
        			identity(errors[i], node.w.length)
        		)
        })

        backwardErrors.forEach((errorLayer, i) => {
        	this.layer.forEach((node, l) => {
        		this.layer[l].update(errorLayer[l]);
        	})
        })
    }
}

function slope(o){
    return o * (1-o);
}

function error(expected, o){
    return o - expected;
}

function delta(expected, o){
    var s = slope(o);
    var e = error(expected, o);
    return e * s;
}

function rnd(){
    return ;
}

function multiply(vectorA, vectorB){
    vectorA.forEach((valA, i)=>{
        vectorA[i] = vectorA[i] * vectorB[i];
    })
    return vectorA;
}

 function identity(val, num){
	var result = [];
	for(var i = 0; i < num; i++){
		result.push(val);
	}
	return result;
}
