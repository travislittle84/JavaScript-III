/* The four principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. .this will always try to point to the window object 
* 2. .this always points to object to the left of the dot
* 3. when using constructor functions points to the INSTANCE of the object the the constructor was told to create
* 4. when using call or apply methods, .this is defined explicitly when calling from the object
*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
console.log(this)

// Principle 2

// code example for Implicit Binding
const friend = {
    name: 'Bob',
    speak: function(input) {
        console.log(`Hello ${input}, my name is ${this.name}`);
    }
}

// Principle 3

// code example for New Binding
function Person (color) {
    this.myColor = 'green';
    this.color = color;
    this.speak = function() {
        console.log(`My favorite color is ${this.myColor} and their favorite color is ${this.color}`);
    }
}

const bob = new Person('yellow');
const jack = new Person('red');

bob.speak();
jack.speak();

// Principle 4

// code example for Explicit Binding

bob.speak.call(jack);
jack.speak.call(bob);