const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ethers } = require("ethers");

require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, 'secret123', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Store the user data in the request object
        next();
    });
}

// Registration
app.post('/api/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' });
    }
});

// Email/Password Login
app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });

    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, 'secret123');

        return res.json({ status: 'ok', user: token });
    } else {
        return res.json({ status: 'error', user: false });
    }
});

// Metamask Login
app.post('/api/login/metamask', async (req, res) => {
    const { address } = req.body;

    try {
        let user = await User.findOne({ address: address });

        // If the user doesn't exist with the Metamask address, register them
        if (!user) {
            user = await User.create({
                name: '', // You might want to let users set their name during registration
                address: address,
                isMetamaskUser: true,
            });
        }

        const token = jwt.sign({
            name: user.name,
            address: user.address,
        }, 'secret123');

        return res.json({ status: 'ok', user: token });
    } catch (err) {
        console.error('Metamask login error:', err);
        return res.json({ status: 'error', user: false });
    }
});

// Dashboard visible to authenticated users
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to the dashboard!', user: req.user });
});

app.listen(1337, () => {
    console.log('Server started on 1337');
});
