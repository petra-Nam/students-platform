import { Router } from 'express';
import { universityController } from './university.controller';

const router = Router();


router.get('/universities', universityController.search);

export default router;
