import {Router} from 'express';
import { router as profileRoute } from './profile';
import { router as sportRoute } from './sport';

export const apiRoutes = Router();

apiRoutes.use('/profile', profileRoute);

apiRoutes.use('/sport', sportRoute);