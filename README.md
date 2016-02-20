# perceptron-js
A simple, readable artificial neural network in JS


###How To
perceptron JS is a simple three layer network that you can play with in your browser

The network constructor takes three arguments:  
1. number of inputs  
2. number of perceptrons in hidden layer  
3. number of perceptrons in output layer  

```javascript
var n = new Network(3,3,2);
```

The network takes an array of binary inputs and give you an array of outputs equal to the number of output perceptrons.
```javascript
n.input([1,1,0]);
```

After you give the network a certain input, you can "train" it by telling it what the output should be. In my experiments this network does quite well after five thousand iterations.
```javascript
n.train([1,0]);
```
