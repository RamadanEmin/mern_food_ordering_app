import express from 'express';
import { jwtCheck, jwtParse } from '../middleware/auth';
import MyRestaurantController from '../controllers/MyRestaurantController';

const router = express.Router();

router.post('/', jwtCheck, jwtParse, MyRestaurantController.createMyRestaurant);

export default router;