const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const express = require('express');
const preAuthRouter = express.Router();
//const crypto = require('crypto');
const repository = require('../repositories/UserRepository');

function generateToken(id) {
    return jwt.sign(id, authConfig.secret);
}

preAuthRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user = await repository.findByEmail(email);
    if (!user)
        return res.status(400).send({ error: 'Email not registered' });
    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Wrong password' });
    user.password = undefined;
    res.send({
        user,
        token: generateToken(user.id)
    });
});

preAuthRouter.post('/register', async (req, res) => {
    const body = req.body;
    const { email } = body;
    try {
        if (await repository.findByEmail(email))
            return res.status(400).send({ error: 'Email already registered' });

        let user = await repository.register(body);
        user.password = undefined;
        return res.json({
            message: "Success",
            user,
            token: generateToken(user.id)
        });
    }
    catch (err) {
        return res.status(400).send({ error: 'Failed', err });
    }
});

module.exports = app => app.use('/session', preAuthRouter);