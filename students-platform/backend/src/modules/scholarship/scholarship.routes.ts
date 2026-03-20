import express from 'express';
import { fetchScholarships } from './scholarship.controller';

const router = express.Router();

router.get('/scholarships', fetchScholarships);

export default router;