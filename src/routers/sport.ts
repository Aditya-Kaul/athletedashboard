import { Router } from 'express';
import { Sequelize } from 'sequelize';
import { Sport, ISportInstance } from '../models/sport';


export const router = Router();

router.get('/', async(req, res, next) => {
    try {

        let sports = await Sport.findAll({
            attributes: ['id', 'name']
        });

        return res.status(200).json({ type: 'success', data: sports, message: '' });
    }
    catch(err) {
        next(err);
    }
});