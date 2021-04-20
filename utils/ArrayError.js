class ArrayError extends Error {
<<<<<<< HEAD
  constructor(errorsArray, message = "") {
    super(message);
    this.errors = errorsArray;
    this.name = "ArrayError";
  }
}

module.exports = ArrayError;
=======
	constructor(errorsArray, message = '') {
		super(message)
		this.errors = errorsArray
		this.name = 'ArrayError'
	}
}

module.exports = ArrayError
>>>>>>> 5d61fcc621f04f55f52605c129e890821274ddb0
