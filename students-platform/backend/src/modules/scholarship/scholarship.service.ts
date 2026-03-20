import axios from 'axios';

export async function getScholarships(query: string): Promise<any> {
    const url = `https://api.careeronestop.org/v1/scholarshipsearch/${process.env.COS_USER_ID}/${query}/0/0/10`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${process.env.COS_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error fetching scholarships:', error.message);
        throw new Error('Failed to fetch scholarships');
    }
}