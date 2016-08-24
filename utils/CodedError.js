function CodedError(message, code){
    this.message = message;
    this.code = code;
}

CodedError.prototype = new Error();

module.exports = CodedError;