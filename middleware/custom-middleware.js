const logger = (req, res, next) =>{
    console.log('Logger...');
    console.log("This is the request method:", req.method);
    console.log("This is the request URL:",req.url);
    next();
};

const blocker = (req, res, next) => {
     if(req.url === '/admin'){
    console.log('Request is blocked.');
    return res.status(403).json({message: "Access to admin is forbidden"});
    }
    next();
};

const customHeader = (req, res, next) => {
    console.log('Adding custom Header...');
    res.setHeader('X-Powered-By', 'Midenga');
    
    next();
};

module.exports = {logger, blocker, customHeader};