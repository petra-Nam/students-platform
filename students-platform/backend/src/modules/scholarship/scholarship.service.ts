import axios from 'axios';
import { env } from '../../config/env';

export class ScholarshipService {
    async getScholarships(query: string): Promise<any> {
        // CareerOneStop API format: /v1/{api}/{userid}/{keyword}/{location}/{radius}/{maxResults}
        const url = `https://api.careeronestop.org/v1/scholarshipsearch/${env.COS_USER_ID}/${query}/0/0/10`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': env.COS_API_TOKEN,
                },
                timeout: 10000, // 10 second timeout
            });
            return response.data;
        } catch (error: any) {
            console.error('Error fetching scholarships:', error.message);
            console.error('Error details:', error.response?.data || error.code);
            if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                throw new Error('Request to scholarship API timed out');
            }
            throw new Error('Failed to fetch scholarships');
        }
    }
}