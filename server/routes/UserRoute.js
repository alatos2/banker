import express from 'express';
import UserController from '../controllers/UserController';

const route = express.Router();

route.post('/auth/signup', UserController.signup);
route.post('/auth/signin', UserController.signin);

export default route;
