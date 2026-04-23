import axios from 'axios';
import { env } from '../../config/env';
import { ScholarshipAPIRequestBuilder } from './scholarship.builder';

export class ScholarshipService {
    async getScholarships(query: string, location: string = '0'): Promise<any> {
        const url = new ScholarshipAPIRequestBuilder()
            .setUserId(env.COS_USER_ID)
            .setKeyword(query)
            .setLocation(location)
            .build();

        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${env.COS_API_TOKEN}`,
                },
                timeout: 10000,
            });
            return response.data;
        } catch (error: any) {
            console.error('Error fetching scholarships:', error.message);
            console.error('Error details:', error.response?.data || error.code);
            if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                throw new Error('Request to scholarship API timed out');
            }
            if (error.response?.status === 401) {
                throw new Error('Invalid API credentials');
            }
            if (error.response?.status === 400) {
                throw new Error('Invalid request parameters');
            }
            throw new Error('Failed to fetch scholarships');
        }
    }
}
