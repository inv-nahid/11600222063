const AsyncHandler = (asyncRequestHandler) => {
    return (req, res, next) => {
        Promise.resolve(asyncRequestHandler(req,res,next)).catch(next);
    }
}

export {AsyncHandler};