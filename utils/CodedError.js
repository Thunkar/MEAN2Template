function CodedError(message, code){
    this.message = message;
    this.code = code;
}

CodedError.prototype = Error.prototype;

module.exports = CodedError;