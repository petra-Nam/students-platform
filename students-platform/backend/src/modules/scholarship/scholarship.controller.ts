import { Request, Response } from 'express';
import { getScholarships } from './scholarship.service';

export async function fetchScholarships(req: Request, res: Response) {
    const query = req.query.q as string;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const scholarships = await getScholarships(query);
        res.json(scholarships);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}