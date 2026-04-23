import type { Request, Response, NextFunction } from 'express';
import { ScholarshipService } from './scholarship.service';

class ScholarshipController {
    private scholarshipService: ScholarshipService;

    constructor() {
        this.scholarshipService = new ScholarshipService();
    }

    fetchScholarships = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query.q as string;

            if (!query) {
                return res.status(400).json({ error: 'Query parameter is required' });
            }

            const scholarships = await this.scholarshipService.getScholarships(query);
            return res.status(200).json(scholarships);
        } catch (err) {
            if (err instanceof Error) {
                if (err.message === 'Request to scholarship API timed out') {
                    return res.status(504).json({ error: 'The scholarship service is currently unavailable. Please try again later.' });
                }
                if (err.message === 'Failed to fetch scholarships') {
                    return res.status(502).json({ error: err.message });
                }
            }
            next(err);
        }
    };
}

export const scholarshipController = new ScholarshipController();