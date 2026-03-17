
require('dotenv').config();

const express = require("express");
const app = express();
const Port = 3000;

const authMiddleware = require("./auth");


app.get("/", (req, res) => {
    res.send("Server working");
});


// routes
app.get("/xyz", authMiddleware, (req, res) => {
    res.send("Access Mil gaya")
});

app.get("/api/rightHeader", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Auth middleware is working correctly"
    });
});



app.use(express.json());

// ❗ supabase import missing tha (ye bhi add karo)
const supabase = require('./config/supabase');
//const { clearScreenDown } = require('node:readline');

app.post('/student', async (req, res) => {
    const { name, email, course } = req.body;

    const { data, error } = await supabase
        .from('student')
        .insert([{ name, email, course }]);

    if (error) {
        return res.json({
            success: false,
            error: error.message
        });
    }

    res.json({
        success: true,
        data
    });
});

app.listen(Port, () => {
    console.log(`Server chal rha hai ${Port} par`);
});