// import express framework
const express = require('express');

// import mysql promise-based client
const mysql = require('mysql2/promise');

// load environment variables from .env file
require('dotenv').config();

// server will run on this port
const port = 3000;

// database configuration object
const dbConfig = {
    // database host (from .env)
    host: process.env.DB_HOST,

    // database username
    user: process.env.DB_USER,

    // database password
    password: process.env.DB_PASSWORD,

    // database name
    database: process.env.DB_NAME,

    // database port
    port: process.env.DB_PORT,

    // allow waiting if connections are busy
    waitForConnections : true,

    // maximum number of connections
    connectionLimit: 100,

    // unlimited queued connection requests
    queueLimit: 0,
};

// create express application
const app = express();

// allow app to read JSON request bodies
app.use(express.json());

// start server and listen on port 3000
app.listen(port, ()=>{
    console.log('Server running on port', port);
});



app.get('/allitems', async (req, res) => {
    try{
        // create database connection
        let connection = await mysql.createConnection(dbConfig);

        // execute SQL query to fetch all rows
        const [rows] = await connection.execute(
            'SELECT * FROM defaultdb.greenplan'
        );

        // send rows back as JSON
        res.json(rows);

        await connection.end();
    } catch (err){
        // log error to console
        console.log(err);

        // send server error response
        res.status(500).json({
            message: 'Server error for allitems'
        });
    }
});


app.post('/additem', async (req, res)=>{
    // extract data from request body
    const {category, item, item_pic, saved_in_g, logged_on} = req.body;

    try{
        // create database connection
        let connection = await mysql.createConnection(dbConfig);

        // insert new item into database
        await connection.execute(
            'INSERT INTO greenplan (category, item, item_pic, saved_in_g, logged_on) VALUES (?,?,?,?,?)',
            [category, item, item_pic, saved_in_g, logged_on]
        );

        // send success response
        res.status(201).json({
            message: 'Item ' + item + ' added successfully'
        });

        await connection.end();
    } catch(err){
        // log error
        console.log(err);

        // send error response
        res.status(500).json({
            message: 'Server error - could not find item ' + item_name
        });
    }
});

app.get('/deleteitem/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            'SELECT * FROM greenplan WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            await connection.end();
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        res.json({
            message: 'Item found for deletion',
            item: rows[0]
        });

        await connection.end();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server error - could not fetch item'
        });
    }
});


app.delete('/deleteitem/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'DELETE FROM greenplan WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            await connection.end();
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        res.json({
            message: 'Item '+ id + ' deleted successfully'
        });

        await connection.end();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server error - could not delete item'+ id
        });
    }
});

// route to update an existing item
app.put('/updateitem', async (req, res) => {
    // extract updated data from request body
    const { id, category, item, item_pic, saved_in_g,logged_on } = req.body;

    try {
        // create database connection
        let connection = await mysql.createConnection(dbConfig);

        // update item data based on id
        const [result] = await connection.execute(
            'UPDATE greenplan SET category = ?, item = ?, item_pic = ?, saved_in_g = ?, logged_on = ? WHERE id = ?',
            [category, item, item_pic, saved_in_g, logged_on, id]
        );

        // if no rows updated, item doesn't exist
        if (result.affectedRows === 0) {
            await connection.end();
            return res.status(404).json({
                message: 'Item not found'
            });
        }

        // send success response
        res.json({
            message: 'Item updated successfully'
        });

        await connection.end();
    } catch (err) {
        // log error
        console.log(err);

        // send server error
        res.status(500).json({
            message: 'Server error - could not update item'
        });
    }
});
