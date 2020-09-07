import { Router } from 'express';
import { Profile, IProfileInstance } from '../models/profile';
import { Sport } from '../models/sport';
import { check, validationResult, body, param } from 'express-validator';

export const router = Router();


router.get('/', async(req, res, next) => {
    try {

        let profile = await Profile.findAndCountAll({
            include: [{
                model: Sport,
                attributes: ['name']
            }]
        });

        return res.status(200).json({ type: 'success', data: profile, message: '' });
    }
    catch(err) {
        next(err);
    }
});

router.get('/:id', async(req, res, next) => {
    try {

        let profile = await Profile.findOne({
            attributes: ['name', 'nationality', 'gender', 'dob', 'sport_id', 'association', 'team', 'instagram_handle', 'facebook_handle', 'twitter_handle', 'description'],
            include: [{
                model: Sport,
                attributes: ['name']
            }],
            where: { id: req.params.id }
        });

        return res.status(200).json({ type: 'success', data: profile, message: '' });
    }
    catch(err) {
        next(err);
    }
});

router.post('/create-profile', async (req, res, next) => {
    try {
        console.log(req.body);

        check('name', 'name should be a string').isString();

        let create_profile = await Profile.create(req.body);

        return res.status(200).json({ type: 'success', data: null, message: '' });
    }
    catch(err) {
        next(err);
    }
});

// router.put('/edit-profile/:id', async (req, res, next) => {
//     try {
//         console.log(req.body);
        
//         // let profile: IProfileInstance = Profile.findOne({ where: { id: req.params.id }});
//         let body = { 
//             name: req.body.name, 
//             gender: req.body.gender, 
//             nationality: req.body.nationality, 
//             dob: req.body.dob,
//             association: req.body.association,
//             team: req.body.team,
//             sport: req.body.sport_name,
//             description: req.body.description,
//             instagram_handle: req.body.instagram_handle,
//             facebook_handle: req.body.facebook_handle,
//             twitter_handle: req.body.twitter_handle
//         }
//         let update = await Profile.update(body);

//         return res.status(200).json({ type: 'success', data: null, message: '' });
//     }
//     catch(err) {
//         next(err);
//     }
// });

