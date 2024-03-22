import express from 'express';
import { login, createUser } from './authUser.controller';

const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/register', createUser);

export default authRoutes;
