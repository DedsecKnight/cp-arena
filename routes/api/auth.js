const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ errors: [{msg: "Invalid token"}]});
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));  
        req.user = decoded.user;
        next();
    } 
    catch (error) {
        console.error(error.message);
        res.status(401).send("Invalid token");
    }

}

module.exports = auth;