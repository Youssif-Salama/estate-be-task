/**
 * Catches any async errors and passes them to the Express error handler.
 * @function
 * @param {Function} fn - the async function to be wrapped
 * @returns {Function} a new function that wraps the original function and catches any promises
 * that may be rejected.
 */
const CatchAsyncErrors=(fn)=>{
  return(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
}



/*
  * a class extends from global error module
  * @class AppError
  * @constructor
  * @param {string} message - the error message
  * @param {number} statusCode - the status code
*/
class AppError extends Error{
  constructor(message,statusCode){
    super(message);
    this.statusCode=statusCode;
  }
}


export {AppError,CatchAsyncErrors};