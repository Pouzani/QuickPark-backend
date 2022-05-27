const errorHandler = (req,res,next)=>{
    let {errorCode} = req.quickpark;
    let errorMsg = "";
    if(errorCode === 'auth/email-already-in-use'){
        errorMsg = "Email already in use !!";
    }
    if(errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found'){
        errorMsg = "Email or password is incorrect !!";
    }
    if(errorCode === 'missing-data'){
        errorMsg = "Missing required values !!";
    }
    if(errorCode === 'auth/invalid-email'){
        errorMsg = "Invalid email !!";
    }
    res.status(400).json({success:false,error:errorMsg});
}

const endPointNotFound = (req,res,next)=>{
    if(req.quickpark){
        next();
        return;
    }
    res.status(404).json({success:false,error:"End point not found"});
}

module.exports = {errorHandler,endPointNotFound};