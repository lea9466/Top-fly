const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.sendStatus(401);

    jwt.verify(token,  process.env.SECRETKEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; // מצרף את הנתונים מהטוקן ל־req
        next();
    });
};

module.exports = verifyToken;