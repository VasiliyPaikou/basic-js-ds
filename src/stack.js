const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement the Stack with a given interface via array.
 *
 * @example
 * const stack = new Stack();
 *
 * stack.push(1); // adds the element to the stack
 * stack.peek(); // returns the peek, but doesn't delete it, returns 1
 * stack.pop(); // returns the top element from stack and deletes it, returns 1
 * stack.pop(); // undefined
 *
 */
class Stack {
	n = []
  push(x) {
	this.n.push(x); return this 
  }

  pop() {
	return this.n.pop() 
  }

  peek() {
	return this.n[this.n.length - 1] 
  }
}

module.exports = {
  Stack
};

