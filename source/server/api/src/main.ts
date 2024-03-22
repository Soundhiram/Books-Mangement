/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './auth-user/authUser.routes';
import bookRouter from './book/book-routes';


// DataBase Connection 
mongoose.connect(
  'mongodb+srv://jamster:Soundar@jamsterapp.cuxjnde.mongodb.net/books'
);

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', authRoutes);
app.use('/api/book', bookRouter
);



app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
