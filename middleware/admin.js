// 401 unauthorized :- if client pass invalid json token will get 401 error code    
// 403 forbidden:- if client entered valid json token but still does not have access to access particular source.

module.exports = function(req, res, next){
    if(!req.user.isAdmin) return res.status(403).send("Access Denied"); //if user is admin then it will pass to next mid fun
    next(); 
}