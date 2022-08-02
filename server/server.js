import express from 'express';
import {readdirSync} from 'fs';
//import cors to fix the port difference of server and client
import cors from 'cors';
import mongoose from 'mongoose';
require('dotenv').config();
const morgan = require('morgan');

const app = express(); // initializing server

//db connection
mongoose.connect(process.env.DATABASE)
.then(()=>console.log('db connected'))
.catch((err)=>console.log(err.message))


// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json())

// route middleware
readdirSync('./routes').map((r)=>app.use('/api',require(`./routes/${r}`)))


const port = process.env.PORT || 5000 ;
//for running the server onto the port number 
app.listen(port,()=>console.log('server is running on port number : 8000'));

