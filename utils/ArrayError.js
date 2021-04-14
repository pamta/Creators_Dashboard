class ArrayError extends Error {
  constructor(errorsArray, message = "") {
    super(message);
    this.errors = errorsArray;
    this.name = "ArrayError";
  }
}

module.exports = ArrayError;
