const request=(req,res,next)=>{
    console.log(`HTTP METHOD- ${req.method}  URL- ${req.url}`);
    next();
}

export {request}