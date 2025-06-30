const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const studentRouter = require('./src/routes/students.routes')
 
const app = express();
dotenv.config();



const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(morgan('dev'));
app.use('/', studentRouter);



app.get('/', (req, res) => {
    res.send('Welcome to my homepage')
})


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`)
})