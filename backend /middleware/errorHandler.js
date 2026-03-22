const errorHandler = (err,req,res,next) =>{
    let statusCode = err.statusCode || 500 ;
    let message = err.message || 'Server error' ;

    // Mongoose bad ObjectI'd
    if(err.name === 'CastError'){
        message = 'Resource not found';
        statusCode = 404 ;
    }
    //Mongoose duplicate key 
    if(err.code === 11000){
        const field = Object.keys(err.keyValue)[0] ;
        message = `${field} already exists`;
        statusCode = 400 ;
    }

    // Mongoose Validation error
    if(err.name === 'ValidationError'){
        message = Object.values(err.errors).map(val => val.message).join(', ')  ;
        statusCode = 400 ; 
    }

    //multer file size error 
    if(err.code === 'LIMIT_FILE_SIZE'){
        message = 'File size exceeeds the max limit 10mb';
        statusCode = 400 ;
    }

    // JWT errors
    if(err.name === 'JsonWebTokenError'){
        message = 'invalid token ' ;
        statusCode = 401;
    }
    if(err.name === 'TokenExpiredError'){
        message = 'token expired' ;
        statusCode = 401;
    }
    console.error('Error : ' , {
        message : err.message ,
        stack : process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });

    res.status(statusCode).json({
        success:false ,
        error : message ,
        statusCode , 
        ...(process.env.NODE_ENV === 'development' && {stack : err.stack})
    });
};
export default errorHandler 