const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const router = express.Router();
const pool = require('../db');
const SECRET_KEY = 'e91f696e93ce5cb5a43208aa0368aae3f711f1a03a66bb052290a22df6fd266fz';


// użycie cookie parsera
router.use(cookieParser());

// Rejestracja
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    try{
        const result = await pool.query(
            'INSERT INTO users (username,password) VALUES ($1, $2) RETURNING *',[username,hashed]
        );
        res.json({message:'Zarejestrowano pomyslnie'});
    }
    catch(err){
        if(err.code==='23505'){
            res.status(400).json({message:'Uzytkownik juz istnieje'});
        }
        else{
            res.status(500).json({message:'Blad serwera'});
        }
    }
});

// Logowanie
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE username = $1',[username]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Błędne dane logowania' });
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    // Ustawienie ciasteczka httpOnly
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 3600000 // 1 godzina
    });

    res.json({ message: 'Zalogowano pomyślnie' });
});
//Wylogowanie
router.post("/logout",(req,res)=>{
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
    });
    res.json({ message: 'Wylogowano pomyślnie' });
})

// Endpoint sprawdzający czy użytkownik jest zalogowany
router.get('/me', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Brak tokena' });
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ username: decoded.username });
    } catch {
        res.status(401).json({ message: 'Nieprawidłowy token' });
    }
});

module.exports = router;
