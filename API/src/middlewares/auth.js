const jwt = require('jsonwebtoken');
const config = require('../config/auth.json');

module.exports = (req, res, next) => {
    const header = req.headers.authorization;

    if (header === undefined)
        return res.status(401).send({ error: "No token provided" });

    const parts = header.split(" ");

    if (parts.length !== 2)
        return res.status(401).send({ error: "Invalid token" });

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: "Token malformatted" });

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err)
            return res.status(401).send({ error: "Invalid token" });

        req.userId = decoded.id;

        return next();
    });
}