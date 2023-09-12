import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import userRoutes from './routes/user.js';
import orderRoutes from './routes/order.js';

// init app
const app = express();

// middleware
app.use( cors() );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

// routes
app.use( '/api/v1/user', userRoutes );
app.use( '/api/v1/order', orderRoutes );

// mongodb
const port = 5000;
mongoose.set( 'strictQuery', true );
mongoose
  .connect( 'mongodb+srv://guangxinyu1998:iyu719818@cluster0.z1hvq4k.mongodb.net/?retryWrites=true&w=majority')
  .then( () => {
    console.log( 'Connected to MongoDB' );
    app.listen( port, () => console.log( `Server is running on port ${ port }` ) );
  } )
  .catch( err => {
    console.log( 'Error connecting to MongoDB', err );
  } )
