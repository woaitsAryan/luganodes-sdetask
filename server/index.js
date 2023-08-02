const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateResetToken } = require('./utility');
const User = require('./models/user.model')

require('dotenv').config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend domain
    methods: 'GET,POST',
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
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
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({
                email: user.email,
            }, 'secret123');

            console.log('Sending response:', { status: 'ok', user: token }); // Log the response object
            return res.json({ status: 'ok', user: token });
        } else {
            return res.json({ status: 'error', user: false });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ status: 'error', user: false });
    }
});

// Metamask Login
app.post('/api/login/metamask', async (req, res) => {
    const { address } = req.body;

    try {
        let user = await User.findOne({ address: address });

        if (!user) {
            user = await User.create({
                name: '',
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
app.get('/api/dashboard', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (user) {
            res.json({ message: 'Welcome to the dashboard!', userInfo: user.email });
        } else {
            res.json({ message: 'Welcome to the dashboard!', userInfo: req.user.address });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Start the server
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
