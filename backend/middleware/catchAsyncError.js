module.exports = theFuns => (req,res,next)=>{
    Promise.resolve(theFuns(req,res,next)).catch(next);
}