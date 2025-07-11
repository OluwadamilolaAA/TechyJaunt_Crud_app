const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    try{
        const authHeader = req.header.authorization;
        if(!authHeader){
            return res.status(401).json({message: 'Authentication failed : Authorization header missing'});
        }
        const token = authHeader.split(' ')[1]
        if(!token){
            return res.status(401).json({message: 'Authentication failed : Token missing'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: 'Authentication failed : Invalid token'})
        }
        req.user = decoded;
        next();
    } catch(error){
        console.error('Authenticated error:', error);
        return res.status(401).json({message: 'Authentication failed : Invalid error'});
    }
};

module.exports = { isAuthenticated };